// @ts-nocheck
import { createRouter } from "./context";
import { createBookingSchema } from "@/schema/booking.schema";
import { z } from "zod";

export const serverRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.booking.findMany({
        include: {
          author: true,
        },
      });
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
        authorId,
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
          author: {
            connect: { id: authorId },
          },
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
  })
  // .query("byUser", {
  //   input: z.object({ email: z.string() }),
  //   resolve: async ({ input }) => {
  //     const { email } = input;
  //     const bookings = await prisma?.bookings.findMany({
  //       where: {author['email']: email },
  //       include: {
  //         author: true,
  //       },
  //     });
  //     return bookings;
  //   },
  // })
  .mutation("updateBooking", {
    input: z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phone: z.string(),
      street: z.string(),
      city: z.string(),
      postalCode: z.string(),
      fault: z.string(),
      engineerReport: z.string(),
      item: z.string(),
      brand: z.string(),
      itemModel: z.string(),
      hardwareInstallation: z.number(),
      softwareInstallation: z.number(),
      isDone: z.boolean(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id, ...rest } = input;

      return await ctx.prisma.booking.update({
        where: { id },
        data: { ...rest },
      });
    },
  })
  .mutation("deleteOne", {
    input: z.object({ id: z.number() }),
    resolve: async ({ input, ctx }) => {
      const { id } = input;

      return await ctx.prisma.booking.delete({
        where: { id },
      });
    },
  });

export type ServerRouter = typeof serverRouter;
