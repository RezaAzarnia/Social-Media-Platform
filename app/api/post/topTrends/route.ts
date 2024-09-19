import prisma from "@/app/_lib/db";
import { HttpResposne } from "@/app/_types";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId") as string;
  const skip: number = Number(url.searchParams.get("skip")) || 1;
  const take: number = Number(url.searchParams.get("take")) || 6;
  try {
    const posts = await prisma.post.findMany({
      skip: (skip - 1) * take,
      take: take,
      orderBy: [{ likes: { _count:"asc" } }],
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
    });
    const isLikedAndSavedByUser: Post[] = posts.map((post) => {
      return {
        ...post,
        isLiked: post.likes.length > 0,
        isSaved: post.savedBy.length > 0,
      };
    });
    const postsCount = await prisma.post.count({
      orderBy: [{ likes: { _count: "asc" } }],
    });
    return NextResponse.json(
      {
        posts: isLikedAndSavedByUser,
        postsCount,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json<HttpResposne>(
      {
        status: 500,
        message: error?.message || "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
