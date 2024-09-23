import prisma from "@/app/_lib/db";
import { HttpResposne, LikeResponse } from "@/app/_types";
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
  try {
    if (isLikedByUser) {
      //dis like the post
      await prisma.like.delete({
        where: {
          userId_postId: {
            postId,
            userId,
          },
        },
      });
      return NextResponse.json<HttpResposne>(
        {
          status: 200,
          message: "post disliked successfully",
        },
        { status: 200 }
      );
    } else {
      //like the post
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return NextResponse.json<HttpResposne>(
        {
          status: 201,
          message: "liked the post",
        },
        {
          status: 201,
        }
      );
    }
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
