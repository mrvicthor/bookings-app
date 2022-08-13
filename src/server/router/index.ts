// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { serverRouter } from "./router";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("bookings.", serverRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
