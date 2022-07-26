import { createRouter } from "./context";
import { hash } from "argon2";
import { signUpSchema } from "@/common/validate/auth";
import * as trpc from "@trpc/server";
import { z } from "zod";

export const userRouter = createRouter()
  .mutation("signUp", {
    input: signUpSchema,
    resolve: async ({ input, ctx }) => {
      const { username, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }
      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
        role: result.role,
      };
    },
  })
  .query("getUserById", {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ input }) => {
      const { id } = input;
      const userId = await prisma?.user.findUnique({
        where: {
          id,
        },
      });
      return userId;
    },
  })
  .query("getAllUsers", {
    resolve: async ({ ctx }) => {
      const res = await ctx.prisma.user.findMany({
        include: {
          bookings: true,
        },
      });
      return res;
    },
  });

export type UserRouter = typeof userRouter;
