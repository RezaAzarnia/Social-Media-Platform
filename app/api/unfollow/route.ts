import prisma from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  const { followerId, followingId }: Record<string, string> = await req.json();
  const isFollowdByUser = await prisma.follower.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  if (!isFollowdByUser) {
    return NextResponse.json(
      {
        status: 404,
        message: "you don't follow this user",
      },
      {
        status: 404,
      }
    );
  }
  try {
    await prisma.follower.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return NextResponse.json(
      {
        status: 200,
        message: "you have unfollowd this user",
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
