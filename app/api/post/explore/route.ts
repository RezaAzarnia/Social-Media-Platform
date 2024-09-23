import prisma from "@/app/_lib/db";
import { HttpResposne, Post } from "@/app/_types";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  const searchParams = new URL(req.url).searchParams;
  const searchValue: string | null = searchParams.get("query");
  const userId = searchParams.get("userId") as string;
  const skip: number = Number(searchParams.get("skip")) || 1;
  const take: number = Number(searchParams.get("take")) || 6;
  try {
    if (searchValue) {
      const posts:Post[] = await prisma.post.findMany({
        skip: (skip - 1) * take,
        take: take,
        where: {
          OR: [
            {
              hashtags: {
                contains: searchValue,
              },
            },
            {
              caption: {
                contains: searchValue,
              },
            },
            {
              location: {
                contains: searchValue,
              },
            },
          ],
        },
        include: {
          creator: {
            select: {
              username: true,
              name: true,
            },
          },
          likes: {
            where: { userId },
          },
          savedBy: {
            where: { userId },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      }) as Post[]

      const postsCount = await prisma.post.count({
        where: {
          OR: [
            {
              hashtags: {
                contains: searchValue,
              },
            },
            {
              caption: {
                contains: searchValue,
              },
            },
            {
              location: {
                contains: searchValue,
              },
            },
          ],
        },
      });
      const isLikedAndSavedByUser: Post[] = posts.map((post:Post) => {
        return {
          ...post,
          isLiked: post.likes.length > 0,
          isSaved: post.savedBy.length > 0,
        };
      });
      return NextResponse.json({
        posts: isLikedAndSavedByUser,
        postsCount,
        status: 200,
      });
    }
    return NextResponse.json({
      posts: [],
      postsCount: 0,
      status: 403,
    });
  } catch (error) {
    return NextResponse.json<HttpResposne>(
      {
        status: 500,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
