import prisma from "@/app/_lib/db";
import { NextResponse } from "next/server";
type FollowedResponse = {
  id: string;
  followerId: string;
  followingId: string;
};
export async function POST(req: Request) {
  const { followerId, followingId } = await req.json();

  try {
    const isFollowedByRequester: FollowedResponse | null =
      await prisma.follower.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });
    if (isFollowedByRequester) {
      return NextResponse.json(
        {
          status: 403,
          message: "you have followed this user",
          ok: false,
        },
        {
          status: 403,
        }
      );
    }

    await prisma.follower.create({
      data: {
        followerId,
        followingId,
      },
    });
    return NextResponse.json(
      { status: 201, mesage: "follow has successfully added", ok: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message || "Internal server Error",
        ok: false,
      },
      { status: 500 }
    );
  }
}
