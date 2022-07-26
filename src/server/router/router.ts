// @ts-nocheck
import { createRouter } from "./context";
import { createBookingSchema } from "@/schema/booking.schema";
import { z } from "zod";

export const serverRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.booking.findMany();
    },
  })
  .mutation("insertOne", {
    input: createBookingSchema,
    resolve: async ({ input, ctx }) => {
      const {
        firstName,
        lastName,
        email,
        phone,
        street,
        city,
        postalCode,
        fault,
        softwareInstallation,
        hardwareInstallation,
        item,
        itemModel,
        engineerReport,
        brand,
      } = input;
      return await ctx.prisma.booking.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          street,
          city,
          postalCode,
          fault,
          softwareInstallation,
          hardwareInstallation,
          item,
          itemModel,
          engineerReport,
          brand,
        },
      });
    },
  })
  .query("byId", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const booking = await prisma?.booking.findUnique({
        where: { id },
      });
      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No booking with id '${id}'`,
        });
      }
      return booking;
    },
  });

export type ServerRouter = typeof serverRouter;
