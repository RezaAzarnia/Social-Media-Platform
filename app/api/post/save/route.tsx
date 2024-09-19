import prisma from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, postId }: Record<string, string> = await req.json();

  const isSaved = await prisma.save.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
  try {
    if (isSaved) {
      //un save the post
      await prisma.save.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return NextResponse.json(
        {
          status: 200,
          message: "un saved post successfully",
        },
        { status: 200 }
      );
    } else {
      //save the post
      const p = await prisma.save.create({
        data: {
          userId,
          postId,
        },
      });
      return NextResponse.json(
        {
          status: 201,
          message: "saved the post",
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
