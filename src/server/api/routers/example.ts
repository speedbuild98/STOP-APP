import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { DateTime } from "luxon";
import CustomError from "~/utils/customError";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  // ────────────────────────────────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────── APP - NO DEMO
  // ────────────────────────────────────────────────────────────────────────────

  // ─────────────── USUARIO ───────────────
  getUserInfo: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: ctx.session?.user.id,
          },
          include: {
            userAdiction: true,
          },
        });

        if (!user) {
          throw new CustomError({
            name: "not_found",
            message: "El usuario no se encontro",
          });
        }

        return user;
      } catch (error) {
        throw error
      }
    }),

  // ─────────────── ADICCIONES ───────────────
  setUserAdicction: protectedProcedure
    .input(z.object({ type: z.string() }))
    .mutation(({ ctx, input }) => {
      try {
        // ctx.prisma.user.update({
        //   where: {
        //     userId: ctx.session?.user.id,
        //   },
        //   data: {
        //     userAdiction: {
        //       create: {
        //         type: input.type,
        //         userId: ctx.session?.user.id,
        //       },
        //     },
        //   },
        // });

        // Lo crea o lo modifica asi que no hay mucha verificacion
        return ctx.prisma.userAddiction.upsert({
          create: {
            type: input.type,
            userId: ctx.session?.user.id,
            user: {
              connect: { id: ctx.session?.user.id, },
            },
          },
          update: {
            type: input.type,
          },
          where: {
            userId: ctx.session?.user.id,
          },
        });

        
      } catch (error) {
        throw error
      }
    }),

  getUserAdicction: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userAddiction = await ctx.prisma.userAddiction.findUnique({
        where: {
          userId: ctx.session?.user.id,
        },
      });

      // const userAddiction = (await ctx.prisma.user.findUnique({
      //   where: {
      //     id: ctx.session?.user.id,
      //   },
      //   include: {
      //     userAdiction: true,
      //   },
      // }))?.userAdiction;

      if (!userAddiction) {
        throw new CustomError({
          name: "not_found",
          message: "El usuario no posee una adiccion asociada",
        });
      }

      return userAddiction;
    } catch (error) {
      throw error
    }
  }),

  deleteUserAdicction: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const userAddiction = await ctx.prisma.userAddiction.delete({
        where: {
          userId: ctx.session?.user.id,
        },
      });
      // lo desconectamos del usuario
      // await ctx.prisma.user.update({
      //   data: {
      //     userAdiction: {
      //       disconnect: true,
      //     },
      //   },
      //   where: {
      //     id: ctx.session?.user.id,
      //   },
      // });

      // lo borramos de la bd por que no interesa mas

      if (!userAddiction) {
        throw  new CustomError({
          name: "not_found",
          message: "El usuario no posee una adiccion asociada",
        });
      }

      return userAddiction;
    } catch (error) {
      throw error
    }
  }),

  setRelapse: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const userAddiction = await ctx.prisma.userAddiction.update({
        data: {
          lastTime: DateTime.now().toString(),
          relapses: {
            increment: 1,
          },
        },
        where: {
         userId: ctx.session?.user.id,
        },
      });

      // const userAddiction = await ctx.prisma.user.update({
      //   data: {
      //     userAdiction: {
      //       update: {
      //         lastTime: DateTime.now().toString(),
      //         relapses: {
      //           increment: 1,
      //         },
      //       },
      //     },
      //   },
      //   where: {
      //     id: ctx.session?.user.id,
      //   },
      // });

      if (!userAddiction) {
        throw new CustomError({
          name: "not_found",
          message: "El usuario no posee una adiccion asociada",
        });
      }

      return userAddiction;
    } catch (error) {
      throw error
    }
  }),
});

// si usamos findUnique solo se puede buscar por ID o por @unique, por que solo devuelve un elemento y solo puede buscar por algo que exista 1 o 0
// lo mismo pasa para un update simple item