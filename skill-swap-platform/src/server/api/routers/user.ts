import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getUserId } from "@/server/clerk";
import { db } from "@/server/db";

export const userRouter = createTRPCRouter({
  getMyProfile: protectedProcedure.query(async () => {
    const userId = getUserId();
    return db.user.findUnique({ where: { externalId: userId } });
  }),

  upsertProfile: protectedProcedure
    .input(z.object({
      name: z.string(),
      location: z.string().optional(),
      photoUrl: z.string().optional(),
      skillsOffered: z.string().array(),
      skillsWanted: z.string().array(),
      availability: z.string(),
      isPublic: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      const userId = getUserId();
      return db.user.upsert({
        where: { externalId: userId },
        update: input,
        create: {
          externalId: userId,
          ...input,
        },
      });
    }),
});