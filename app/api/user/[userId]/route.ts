import prisma from "@/app/_lib/db";
import { HttpResposne } from "@/app/_types";
import { NextResponse } from "next/server";

type Props = {
  params: {
    userId: string;
  };
};

export async function GET(
  req: Request,
  { params: { userId } }: Props
): Promise<NextResponse> {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      include: {
        followers: {
          where: {
            followerId: userId,
          },
        },
      },
    });
    const usersWithFollowStatus = users.map((user: any) => ({
      ...user,
      isFollowing: user.followers.length > 0,
    }));

    return NextResponse.json(
      {
        data: usersWithFollowStatus,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json<HttpResposne>(
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
