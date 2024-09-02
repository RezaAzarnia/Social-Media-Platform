import prisma from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const searchValue: string | null = url.searchParams.get("query");
  const skip: number = Number(url.searchParams.get("skip")) || 1;
  const take: number = Number(url.searchParams.get("take")) || 6;
  try {
    if (searchValue) {
      const posts = await prisma.post.findMany({
        skip: (skip - 1) * take,
        take: take,
        where: {
          OR: [
            {
              hashtags: {
                contains: searchValue,
              },
            },
            {
              caption: {
                contains: searchValue,
              },
            },
            {
              location: {
                contains: searchValue,
              },
            },
          ],
        },
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
        where: {
          OR: [
            {
              hashtags: {
                contains: searchValue,
              },
            },
            {
              caption: {
                contains: searchValue,
              },
            },
            {
              location: {
                contains: searchValue,
              },
            },
          ],
        },
      });
      return NextResponse.json({
        postsCount,
        posts,
        status: 200,
      });
    }
    return NextResponse.json({
      posts: [],
      postsCount: 0,
      status: 403,
    });
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
