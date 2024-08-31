import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginCredentials } from "@/app/_types";

import { loginHandler } from "./actions";

declare module "next-auth" {
  interface Session {
    userId: string;
    name: string;
    username: string;
    // refreshToken: string;
    // accessToken: string;
    // expires: number; // Assuming this property represents token expiration time
    // createdAt: Date;
  }
  interface JWT {
    email: string;
    username: string;
    refreshToken: string;
    expires: number; // Assuming this property represents token expiration time
    accessToken: string;
    createdAt: number; // Assuming this property represents token creation time
    // Add other missing pr
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
          if (!res.ok) {
            throw new Error("invalid crediationls");
          }
          const response = await res.json();
          return response;
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
  },

});
