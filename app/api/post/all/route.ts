import prisma from "@/app/_lib/db";
import { Post } from "@/app/_types";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const userId: string = url.searchParams.get("userId") as string;

  const page: number = Number(url.searchParams.get("page")) || 1;
  const limit: number = Number(url.searchParams.get("limit")) || 6;

  try {
    const postsCount = await prisma.post.count();
    const posts: Post[] = (await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
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
    })) as Post[];
    const isLikedAndSavedByUser: Post[] = posts.map((post:Post) => {
      return {
        ...post,
        isLiked: post?.likes.length > 0,
        isSaved: post?.savedBy.length > 0,
      };
    });
    return NextResponse.json(
      {
        status: 200,
        posts: isLikedAndSavedByUser,
        postsCount,
      },
      { status: 200 }
    );
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
