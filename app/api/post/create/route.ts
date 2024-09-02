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
  const pathDir = "./public/uploads/";
  const fileName = randomUUID() + file.name;

  try {
    const filePath = `${pathDir}${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log(buffer);
    const stream = Readable.from(buffer);
    console.log(stream);
    await pump(stream, fs.createWriteStream(filePath));

    await prisma.post.create({
      data: {
        caption: body.caption as string,
        imageUrl: `/uploads/${fileName}`,
        creatorId: body.userId as string,
        location: body.location as string,
        hashtags: body.hashtags as string,
      },
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Post created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server Error",
      },
      {
        status: 500,
      }
    );
  }
}
