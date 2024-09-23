import prisma from "@/app/_lib/db";
import { Post } from "@/app/_types";
import { NextResponse } from "next/server";
interface SavedPostItem {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  post: {
    id: string;
    caption: string;
    imageUrl: string;
    creatorId: string;
    createdAt: Date;
    location: string;
    hashtags: string;
    creator: {
      username: string;
      name: string;
    };
    _count: {
      likes: number;
    };
    likes: Array<Record<string, any>>; // یا تایپ دقیق‌تر برای `like`
    savedBy: Array<Record<string, any>>; // یا تایپ دقیق‌تر برای `save`
  };
}
export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const userId: string = url.searchParams.get("userId") as string;
  const skip: number = Number(url.searchParams.get("page")) || 1;
  const take: number = Number(url.searchParams.get("limit")) || 6;

  try {
    const savedPosts: SavedPostItem[] = await prisma.save.findMany({
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

    const posts: Post[] = savedPosts.map((item: SavedPostItem) => {
      const { post } = item;
      return {
        ...post,
        isLiked: post.likes.length > 0,
        isSaved: post.savedBy.length > 0,
      };
    });
    //  console.log(posts);

    const response = NextResponse.json(
      {
        status: 200,
        posts,
        postsCount,
      },
      {
        status: 200,
      }
    );
    return response;
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
