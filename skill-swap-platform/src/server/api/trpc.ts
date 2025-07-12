import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server"; // ✅ Required

export const createContext = async (opts: { req: NextRequest }) => {
  return {
    req: opts.req,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const { userId } = getAuth(ctx.req); // ✅ Now works with Clerk

  if (!userId) throw new Error("Unauthorized");

  return next({
    ctx: {
      userId,
    },
  });
});
