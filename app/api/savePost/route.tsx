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
  if (isSaved) {
    return NextResponse.json({
      status: 403,
      message: "you have saved this message",
    });
  }
  try {
    await prisma.save.create({
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
