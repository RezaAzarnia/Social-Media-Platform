import prisma from "@/app/_lib/db";
import { NextResponse } from "next/server";
import fs from "fs"; 
import path from "path";

export async function DELETE(req: Request) {
  const { postId } = await req.json();

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          status: 404,
          message: "Post not found",
          ok: false,
        },
        {
          status: 404,
        }
      );
    }

    // مسیر عکس از پست دریافت شده
    const imagePath = path.join(process.cwd(), "public", post.imageUrl);

    // حذف عکس از پوشه public/uploads
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // حذف پست از دیتابیس
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    const postsLength = await prisma.post.count();

    return NextResponse.json(
      {
        status: 200,
        message: "Post deleted successfully",
        postsLength,
        ok: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message || "Internal server error",
        ok: false,
      },
      {
        status: 500,
      }
    );
  }
}
