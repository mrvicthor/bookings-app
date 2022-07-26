// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const bookings = async (req: NextApiRequest, res: NextApiResponse) => {
  const bookings = await prisma.booking.findMany();
  res.status(200).json(bookings);
};

export default bookings;
