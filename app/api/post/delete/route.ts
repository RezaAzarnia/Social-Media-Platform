import prisma from "@/app/_lib/db";
import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { client } from "@/app/utils/utils";

const params = {
  Bucket: process.env.LIARA_BUCKET_NAME,
};
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
    // حذف پست از دیتابیس
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    await client.send(
      new DeleteObjectCommand({ ...params, Key: post?.imageUrl as string })
    );

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
