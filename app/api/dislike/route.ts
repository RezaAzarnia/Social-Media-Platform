import prisma from "@/app/_lib/db";
import { LikeResponse } from "@/app/_types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId, userId } = await req.json();
  const isPostLiked: LikeResponse | null = await prisma.like.findUnique({
    where: {
      userId_postId: {
        postId,
        userId,
      },
    },
  });
  if (!isPostLiked) {
    return NextResponse.json(
      {
        status: 404,
        message: "you haven't like this post",
      },
      { status: 200 }
    );
  }
  try {
    await prisma.like.delete({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });
    return NextResponse.json(
      {
        status: 200,
        message: "post disliked successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Intrenal server error",
      },
      { status: 500 }
    );
  }
}
