import prisma from "@/app/_lib/db";
import { postSchema } from "@/app/_lib/validationSchema";
import { NextResponse } from "next/server";
import { pipeline } from "stream";
import { promisify } from "util";
import { randomUUID } from "crypto";
import fs from "fs";
import { Readable } from "stream"; // استفاده از stream از خود Node.js

const pump = promisify(pipeline);

export async function POST(req: Request) {
  const data = await req.formData();
  const body = Object.fromEntries(data);
  const postValidation = postSchema.safeParse(body);
  if (!postValidation.success) {
    return NextResponse.json({
      message: postValidation?.error?.flatten().fieldErrors,
    });
  }

  const file = body.picture as File;
  const fileName = Date.now() + file.name;

  try {
    const filePath = `./public/uploads/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);
    await pump(stream, fs.createWriteStream(filePath));

    const response = await prisma.post.create({
      data: {
        caption: body.caption as string,
        imageUrl: `uploads/${fileName}`,
        creatorId: body.userId as string,
        location: body.location as string,
        hashtags: body.hashtags as string,
      },
    });
    return NextResponse.json(
      {
        status: 201,
        ok: true,
        message: "Post created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message || "Internal server Error",
        ok: false,
      },
      {
        status: 500,
      }
    );
  }
}
