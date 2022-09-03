import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";
import { prisma } from "@/server/db/client";
import { loginSchema } from "./validate/auth";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      authorize: async (credentials, request) => {
        const creds: any = await loginSchema.parseAsync(credentials);

        const user: any = await prisma.user.findFirst({
          where: {
            email: creds.email,
          },
        });

        const isValidPassword = await verify(user?.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        if (user && isValidPassword) {
          return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session(arg) {
      arg.session.user = arg.token.user as any;

      return arg.session;
    },
    async jwt(arg) {
      if (arg.user) arg.token.user = arg.user;

      return arg.token;
    },
  },
  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/login",
  },
};
