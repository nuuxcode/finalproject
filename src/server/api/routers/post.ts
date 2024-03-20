import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { currentUser } from "@clerk/nextjs";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // This is a protected procedure, meaning that the user must be logged in to access it. If they try to
  // access it without being logged in, they will get an UNAUTHORIZED error.
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();

      return ctx.db.post.create({
        data: {
          name: input.name,
          clerkUser: ctx.session.userId,
          email: user?.emailAddresses[0]?.emailAddress ?? "",
        },
      });
    }),

  getPostsByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: {
          clerkUser: input.userId,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  getAllPosts: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
