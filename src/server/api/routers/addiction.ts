import { z } from "zod";
import { DateTime } from "luxon";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import CustomError from "~/utils/customError";

// Creación del enrutador para la funcionalidad relacionada con la adicción
export const addictionRouter = createTRPCRouter({
  // Método para obtener la adicción del usuario actual
  getUserAddiction: protectedProcedure.query(async ({ ctx }) => {
  try {
    const userId = ctx.session.user.id;
    let addiction = await ctx.prisma.addiction.findUnique({
      where: {
        userId,
      },
    });

    // Si no existe una adicción para el usuario, se crea una nueva con valores predeterminados
    if (!addiction) {
      addiction = await ctx.prisma.addiction.create({
        data: {
          name: "Falopa", // Nombre por defecto
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    return addiction;
  } catch (error) {
    // Manejo de errores: devuelve un mensaje de error al usuario
    console.error(error);
    throw new Error("Ocurrió un error al obtener la adicción del usuario. Por favor, inténtalo de nuevo más tarde.");
  }
}),

  // Método para registrar una recaída en la adicción
  setRelapse: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const Addiction = await ctx.prisma.addiction.update({
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
      // Si no se encuentra la adicción asociada al usuario, se lanza un error personalizado
      if (!Addiction) {
        throw new CustomError({
          name: "not_found",
          message: "El usuario no posee una adiccion asociada",
        });
      }
      return Addiction;
    } catch (error) {
      throw error;
    }
  }),

  // Método para establecer el mejor registro de días sobrios
  setBest: protectedProcedure
    .input(z.object({ best: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.addiction.update({
        where: { userId: ctx.session?.user.id },
        data: {
          best: input.best,
        },
      });
    }),
});
