import prisma from "@/app/_lib/db";
import { HttpResposne } from "@/app/_types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const skip: number = Number(url.searchParams.get("skip")) || 1;
  const take: number = Number(url.searchParams.get("take")) || 6;
  try {
    const posts = await prisma.post.findMany({
      skip: (skip - 1) * take,
      take: take,
      orderBy: [{ createdAt: "desc" }, { likes: { _count: "desc" } }],
      include: {
        creator: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
    const postsCount = await prisma.post.count({
      orderBy: [{ createdAt: "desc" }, { likes: { _count: "desc" } }],
    });
    return NextResponse.json(
      {
        posts,
        postsCount,
        status: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json<HttpResposne>(
      {
        status: 500,
        message: error?.message || "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
