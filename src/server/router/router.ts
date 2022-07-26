// @ts-nocheck

import { createRouter } from "./context";
import { createBookingSchema } from "@/schema/booking.schema";

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
  });

export type ServerRouter = typeof serverRouter;
