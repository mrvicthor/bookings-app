import z from "zod";

export const createBookingSchema = z.object({
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
});

export type CreateBookingInput = z.TypeOf<typeof createBookingSchema> | any;
