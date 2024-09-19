import prisma from "@/app/_lib/db";
import { AuthenticatedUser, Post } from "@/app/_types";
import { NextResponse } from "next/server";
type Props = {
  params: { username: string };
};
export async function GET(req: Request, { params: { username } }: Props) {
  const searchParams = new URL(req.url).searchParams;
  const skip: number = Number(searchParams.get("skip")) || 0;
  const take: number = Number(searchParams.get("take")) || 5;

  let requestQuery = searchParams.get("requestQuery") ?? "userPosts";

  const userId: string = searchParams.get("userId") as string;

  const user: AuthenticatedUser | null = (await prisma.user.findUnique({
    where: { username },
  })) as AuthenticatedUser;

  const posts = [];
  let postsCount = 0;
  //preventing access to other users liked posts by change url
  if (requestQuery === "liked" && userId !== user?.id) {
    requestQuery = "userPosts";
  }

  try {
    if (requestQuery === "userPosts") {
      const postsLength = await prisma.post.count({
        where: { creatorId: user?.id },
      });
      const userCreatedPosts = await prisma.post.findMany({
        skip: (skip - 1) * take,
        take: take,
        where: {
          creatorId: user?.id,
        },
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
      });

      const isLikedAndSavedByUser: Post[] = userCreatedPosts.map((post) => {
        return {
          ...post,
          isLiked: post.likes.length > 0,
          isSaved: post.savedBy.length > 0,
        };
      });

      postsCount = postsLength;
      posts.push(...isLikedAndSavedByUser);
    } else if (requestQuery === "liked" && userId === user?.id) {
      const postsLength = await prisma.like.count({
        where: {
          userId,
        },
      });

      const userLikedPosts = await prisma.like.findMany({
        skip: (skip - 1) * take,
        take: take,
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          post: {
            include: {
              creator: {
                select: {
                  username: true,
                  name: true,
                },
              },
              savedBy: {
                where: { userId },
              },
              likes: { where: { userId } },
              _count: {
                select: {
                  likes: true, // تعداد کل لایک‌ها
                },
              },
            },
          },
        },
      });

      const isLikedAndSavedByUser = userLikedPosts.map((p) => {
        const { post } = p;
        const newValues = {
          ...post,
          isLiked: post.likes.length > 0,
          isSaved: post.savedBy.length > 0,
        };
        const { likes, savedBy, ...newItem } = newValues;
        return newItem;
      });

      posts.push(...isLikedAndSavedByUser);
      postsCount = postsLength;
    }
    return NextResponse.json(
      {
        status: 200,
        posts: posts,
        postsCount,
      },
      {
        status: 200,
      }
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
