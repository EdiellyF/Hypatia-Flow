import { getUserConquistas, getSessoesForUser } from '../repository/conquistaRepository.js';

export const listConquistas = async (userId) => {
  return getUserConquistas(userId);
};

export const calculateNivel = async (userId) => {
  const sessoes = await getSessoesForUser(userId);
  const totalXp = sessoes.reduce((sum, s) => sum + (new Date(s.dataHoraFim) - new Date(s.dataHoraInicio)) / (1000 * 60), 0);
  let level = 1;
  let remaining = totalXp;
  while (remaining >= level * 100) {
    remaining -= level * 100;
    level += 1;
  }
  return { level, xp: remaining, nextLevelXp: level * 100 };
};

export const checkConquistas = async (userId) => {
  const sessoes = await getSessoesForUser(userId);
  const conquistasAtuais = await getUserConquistas(userId);
  if (sessoes.length >= 1 && !conquistasAtuais.some(c => c.conquistaId === 'first_petala')) {
    await prisma.userConquista.create({
      data: { userId, conquistaId: 'first_petala', dataDesbloqueio: new Date() }
    });
  }
  const hasLongSession = sessoes.some(s => (new Date(s.dataHoraFim) - new Date(s.dataHoraInicio)) / (1000 * 60) >= 120);
  if (hasLongSession && !conquistasAtuais.some(c => c.conquistaId === 'maratonista')) {
    await prisma.userConquista.create({
      data: { userId, conquistaId: 'maratonista', dataDesbloqueio: new Date() }
    });
  }

  return { message: 'Conquistas verificadas e atualizadas!' };
};