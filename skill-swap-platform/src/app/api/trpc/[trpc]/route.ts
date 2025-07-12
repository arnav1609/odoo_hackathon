import { appRouter } from "@/server/api/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/server/api/trpc";
import { NextRequest } from "next/server"; // ✅ Required

const handler = (req: Request) => {
  // ✅ Cast native Request to NextRequest
  const nextReq = req as NextRequest;

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: nextReq,
    router: appRouter,
    createContext: async () => await createContext({ req: nextReq }),
  });
};

export { handler as GET, handler as POST };
