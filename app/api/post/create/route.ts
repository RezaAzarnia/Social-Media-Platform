import prisma from "@/app/_lib/db";
import { postSchema } from "@/app/_lib/validationSchema";
import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { client } from "@/app/utils/utils";
import sharp from "sharp";
import { randomUUID } from "crypto";

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
  const fileName = `${Date.now()}-${randomUUID()}-${file.name}`;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    //optmize picture size
    const optimizedImageBuffer = await sharp(buffer)
      .resize({ width: 1200 })
      .toFormat("webp", { quality: 80 })
      .rotate()
      .toBuffer();

    const uploadParams = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: `/uploads/${fileName}`,
      Body: optimizedImageBuffer,
      ContentType: file.type,
    };

    const res = await client.send(new PutObjectCommand(uploadParams));
    await prisma.post.create({
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
    console.log(error.message);
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server Error",
        ok: false,
      },
      {
        status: 500,
      }
    );
  }
}
