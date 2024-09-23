import prisma from "@/app/_lib/db";
import { loginSchema } from "@/app/_lib/validationSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
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
        email,
      },
    });
    const isMatch = user && (await bcrypt.compare(password, user?.password));
 
    if (!user || !isMatch) {
      return NextResponse.json<HttpResposne>(
        {
          status: 403,
          message: "email or password is wrong",
          ok: false,
        },
        {
          status: 403,
        }
      );
    }
    return NextResponse.json(
      {
        user,
        status: 200,
        ok: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<HttpResposne>(
      {
        status: 500,
        message: "internal server occured",
        ok: false,
      },
      {
        status: 500,
      }
    );
  }
}
