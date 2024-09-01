import prisma from "@/app/_lib/db";
import { Post } from "@/app/_types";
import { NextResponse } from "next/server";

export async function GET(req: Request):Promise<NextResponse> {
  const url = new URL(req.url);
  const userId: string = url.searchParams.get("userId") as string;
  const skip: number = Number(url.searchParams.get("skip")) || 0;
  const take: number = Number(url.searchParams.get("take")) || 5;

  try {
    const savedPosts = await prisma.save.findMany({
      skip: (skip - 1) * take,
      take: take,
      where: {
        userId,
      },
      include: {
        post: {
          include: {
            creator: {
              select: {
                name: true,
                username: true,
              },
            },
            _count: {
              select: {
                likes: true, // تعداد کل لایک‌ها
              },
            },
            likes: {
              where: {
                userId,
              },
            },
            savedBy: {
              where: {
                userId,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const postsCount = await prisma.save.count({
      where: {
        userId,
      },
    });

    const posts: Post[] = savedPosts.map((item) => {
      const { post } = item;
      const newValues = {
        ...post,
        isLiked: post.likes.length > 0,
        isSaved: post.savedBy.length > 0,
      };
      const { likes, savedBy, ...newItem } = newValues;
      return newItem;
    });

    const response =  NextResponse.json(
      {
        status: 200,
        posts,
        postsCount,
      },
      {
        status: 200,
      }
    );
return response
  } catch (error) {
    return NextResponse.json(
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
