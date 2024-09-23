import prisma from "@/app/_lib/db";
import { HttpResposne, Post } from "@/app/_types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const postId = searchParams.get("postId") as string;
  const userId = searchParams.get("userId") as string;

  const page: number = Number(searchParams.get("page")) || 1;
  const limit: number = Number(searchParams.get("limit")) || 6;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    const relatedPosts:Post[] = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        id: {
          not: postId,
        },
        OR: [
          {
            hashtags: {
              contains: post?.hashtags,
            },
          },
          {
            caption: {
              contains: post?.caption,
            },
          },
          {
            location: {
              contains: post?.location,
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
      skip: (page - 1) * limit,
      take: limit,
      where: {
        id: {
          not: postId,
        },
        OR: [
          {
            hashtags: {
              contains: post?.hashtags,
            },
          },
          {
            caption: {
              contains: post?.caption,
            },
          },
          {
            location: {
              contains: post?.location,
            },
          },
        ],
      },
    });
    const isLikedAndSavedByUser: Post[] = relatedPosts.map((post:Post) => {
      return {
        ...post,
        isLiked: post.likes.length > 0,
        isSaved: post.savedBy.length > 0,
      };
    });
    return NextResponse.json(
      {
        posts: isLikedAndSavedByUser,
        postsCount,
        status: 200,
        ok: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json<HttpResposne>(
      {
        status: 500,
        message: error?.message || "internal server error",
        ok: false,
      },
      {
        status: 500,
      }
    );
  }
}
