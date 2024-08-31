import prisma from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request):Promise<NextResponse> {
  const { userId, postId }: Record<string, string> = await req.json();

  const isSaved = await prisma.save.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
  if (!isSaved) {
    return NextResponse.json({
      status: 403,
      message: "you have not saved this message",
    });
  }

  try {
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
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
