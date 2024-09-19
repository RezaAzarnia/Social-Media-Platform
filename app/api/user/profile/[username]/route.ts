import prisma from "@/app/_lib/db";
import { HttpResposne } from "@/app/_types";
import { NextResponse } from "next/server";
type Props = {
  params: {
    username: string;
  };
};
export async function GET(req: Request, { params: { username } }: Props) {
  const url = new URL(req.url);
  const userId: string | null = url.searchParams.get("userId");

  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
        // followers: true,
        // following: true,
      },
    });

    if (!userProfile) {
      return NextResponse.json(
        {
          status: 404,
          message: "there is no user with this id",
        },
        {
          status: 404,
        }
      );
    }

    const isFollowing = await prisma.follower.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId!,
          followingId: userProfile.id,
        },
      },
    });
    
    const userDeatil = {
      ...userProfile,
      isFollowing: !!isFollowing,
      isCurrentUserProfile: userProfile?.id === userId,
    };
    return NextResponse.json(
      {
        status: 200,
        profile: userDeatil,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<HttpResposne>(
      {
        message: "internal server error",
        status: 500,
      },
      { status: 500 }
    );
  }
}
