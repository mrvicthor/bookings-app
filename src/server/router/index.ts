// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { serverRouter } from "./router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("bookings.", serverRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
