import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserConquistas = async (userId) => {
  return prisma.userConquista.findMany({
    where: { userId },
    include: { conquista: true },
  });
};

export const getSessoesForUser = async (userId) => {
  return prisma.sessaoEstudo.findMany({ where: { idUsuario: userId } });
};

