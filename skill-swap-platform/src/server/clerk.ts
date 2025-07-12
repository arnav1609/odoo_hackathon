import { auth } from "@clerk/nextjs/server";

// Utility to get the current user's ID
export const getUserId = async (): Promise<string | null> => {
  const session = await auth();
  return session?.userId ?? null;
};
