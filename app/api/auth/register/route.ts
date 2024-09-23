import { NextResponse } from "next/server";
import { registerSchema } from "@/app/_lib/validationSchema";
import { NewUserDetails, HttpResposne } from "@/app/_types";
import prisma from "@/app/_lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request): Promise<NextResponse> {
  const data: NewUserDetails = await req.json();

  const { username, email, password, name } = data;

  const userValidation = registerSchema.safeParse(data);

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
    const isExitUser = await prisma.user.findMany({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (isExitUser.length > 0) {
      return NextResponse.json<HttpResposne>(
        {
          status: 409,
          message: "This email or username is exist. Please try another one!!",
        },
        { status: 409 }
      );
    }
    const hashedPassword = async (password: string): Promise<string> => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    };

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        bio:"",
        password: await hashedPassword(password),
      },
    });

    return NextResponse.json(
      {
        status: 201,
        message: "user created successfully",
        ok:true
      },
      {
        status: 201,
      }
    );
  } catch (error:any) {
    return NextResponse.json<HttpResposne>(
      {
        status: 500,
        message: error.message || "Internal Server Error",
        ok:false
      },
      {
        status: 500,
      }
    );
  }
}
