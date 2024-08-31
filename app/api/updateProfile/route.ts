import prisma from "@/app/_lib/db";
import { editUserSchema } from "@/app/_lib/validationSchema"
import { HttpResposne } from "@/app/_types";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const userData = await req.json();

  const { userId, name, password, bio } = userData;
  const userValidation = editUserSchema.safeParse(userData);

  if (!userValidation.success) {
    return NextResponse.json(
      {
        status: 400,
        error: userValidation?.error?.flatten().fieldErrors,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const hashedPassword = async (password: string): Promise<string> => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    };

    const userOldValues = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const newUserInfo = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name ? name : userOldValues?.name,
        bio: bio ? bio : userOldValues?.bio,
        password: password
          ? await hashedPassword(password)
          : userOldValues?.password,
      },
    });
    return NextResponse.json(
      {
        status: 200,
        newUserInfo,
      },
      {
        status: 200,
        statusText: "update successfully",
      }
    );
  } catch (error) {
    return NextResponse.json<HttpResposne>(
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
