import prisma from "@/app/_lib/db";
import { LikeResponse } from "@/app/_types";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  const { userId, postId } = await req.json();
  const isLikedByUser: LikeResponse | null = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
  if (isLikedByUser) {
    return NextResponse.json(
      {
        status: 404,
        message: "you like this post!",
      },
      {
        status: 404,
      }
    );
  }
  try {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
    return NextResponse.json(
      {
        status: 201,
        message: "liked the post",
      },
      {
        status: 201,
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
