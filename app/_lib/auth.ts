import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginCredentials } from "@/app/_types";
import { loginHandler } from "./actions";
import { NextRequest, NextResponse } from "next/server";

declare module "next-auth" {
  interface Session {
    userId: string;
    name: string;
    username: string;
  }
  interface JWT {
    email: string;
    username: string;
    refreshToken: string;
    expires: number;
    accessToken: string;
    createdAt: number;
  }
  interface User {
    accessToken: string;
    refreshToken: string;
    username: string;
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const res = await loginHandler(credentials as LoginCredentials);
          const response = await res.json();

          if (!response.ok) {
            throw new Error("invalid crediationls");
          }
          return response.user;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error("some thing went wrong");
          }
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.userId = token.userId as string;
      session.name = token.name as string;
      session.username = token.username as string;

      return session;
    },
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        return {
          userId: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        };
      }
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }
      return token;
    },
    authorized: ({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) => {
      const protectedPathsRegex: RegExp = /^(?!\/(login|register)).*/;
      const url = new URL(request.url);

      if (auth && (url.pathname === "/login" || url.pathname === "/register")) {
        const newUrl = new URL("/", request.nextUrl.origin);
        return Response.redirect(newUrl);
      }
      if (!auth && protectedPathsRegex.test(url.pathname)) {
        const newUrl = new URL("/login", request.nextUrl.origin);
        return Response.redirect(newUrl);
      }

      return NextResponse.next();
    },
  },
});
