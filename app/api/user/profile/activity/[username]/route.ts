import prisma from "@/app/_lib/db";
import { AuthenticatedUser, Post } from "@/app/_types";
import { NextResponse } from "next/server";
type Props = {
  params: { username: string };
};
export async function GET(req: Request, { params: { username } }: Props) {
  const url = new URL(req.url);
  const skip: number = Number(url.searchParams.get("skip")) || 0;
  const take: number = Number(url.searchParams.get("take")) || 5;
  let requestQuery = url.searchParams.get("requestQuery") ?? "userPosts";
  const userId: string = url.searchParams.get("userId") as string;

  const user: AuthenticatedUser | null = (await prisma.user.findUnique({
    where: { username },
  })) as AuthenticatedUser;

  const posts = [];
  let postsCount = 0;
  // check if the logged in user id oppisite of the id of the username in that case show the user posts
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
        },
      });

      postsCount = postsLength;
      userCreatedPosts.map((post) => {
        posts.push(post);
      });
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
            },
          },
        },
      });
      posts.push(userLikedPosts.map((post) => post.post));
      postsCount = postsLength;
    }
    return NextResponse.json(
      {
        status: 200,
        posts: posts.flat(),
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
