import prisma from "@/app/_lib/db";
import { Post } from "@/app/_types";
import { NextResponse } from "next/server";
type Props = {
  params: { postId: string };
};
export async function GET(req: Request, { params: { postId } }: Props) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId") ?? "";

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
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
            likes: true, // تعداد کل لایک‌ها
          },
        },
      },
    });
    const relatedPosts = await prisma.post.findMany({
      take: 6,
      where: {
        id: {
          not: post?.id,
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
      },
    });

    if (post) {
      const newValues: Post = {
        ...post,
        isLiked: post.likes.length > 0,
        isSaved: post.savedBy.length > 0,
      };

      return NextResponse.json(
        {
          status: 200,
          post: newValues,
          relatedPosts,
        },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json(
      {
        status: 404,
        message: "there is no post with this infos",
      },
      {
        status: 404,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
