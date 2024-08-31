import prisma from "@/app/_lib/db";
import { AuthenticatedUser } from "@/app/_types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId: string = url.searchParams.get("userId") as string;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    }) as AuthenticatedUser
    if (!user) {
      return NextResponse.json(
        {
          status: 404,
          message: "user with this id doesn't exist!",
          ok: false,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        status: 200,
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message || "Internal Server error",
      },
      {
        status: 500,
      }
    );
  }
}
