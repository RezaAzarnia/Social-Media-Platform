import prisma from "@/app/_lib/db";
import { loginSchema } from "@/app/_lib/validationSchema"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginCredentials, HttpResposne } from "@/app/_types";

export async function POST(request: Request): Promise<NextResponse> {
  const data: LoginCredentials = await request.json();

  const { email, password } = data;

  const userValidation = loginSchema.safeParse(data);

  if (!userValidation.success) {
    return NextResponse.json(
      {
        status: 400,
        message: userValidation?.error?.flatten().fieldErrors,
      },
      {
        status: 400,
      }
    );
  }
  try {
    const user: LoginCredentials | null = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const isMatch = user && (await bcrypt.compare(password, user?.password));

    if (!user || !isMatch) {
      return NextResponse.json<HttpResposne>(
        {
          status: 403,
          message: "email or password is wrong",
        },
        {
          status: 403,
        }
      );
    }
    const token = jwt.sign(user, process.env.SECRET_KEY ?? "Secret_key", {
      expiresIn: "2h",
    });

    const refreshToken = jwt.sign(
      user,
      process.env.REFRESH_SECRET_KEY ?? "Refresh_Secret_key",
      { expiresIn: "2d" }
    );

    await prisma.session.create({
      data: {
        userId: user.id as string,
        accessToken: token,
        refreshToken: refreshToken,
      },
    });

    return NextResponse.json(
      {
        user,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<HttpResposne>(
      {
        status: 500,
        message: "internal server occured",
      },
      {
        status: 500,
      }
    );
  }
}
