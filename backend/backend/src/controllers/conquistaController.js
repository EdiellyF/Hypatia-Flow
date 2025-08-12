import { listConquistas, calculateNivel, checkConquistas } from '../services/conquistaService.js';

export const getConquistas = async (req, res) => {
  const { userId } = req.params;
  try {
    const conquistas = await listConquistas(userId);
    res.json(conquistas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar conquistas' });
  }
};

export const getNivel = async (req, res) => {
  const { userId } = req.params;
  try {
    const nivel = await calculateNivel(userId);
    res.json(nivel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular nível' });
  }
};

export const postCheck = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await checkConquistas(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar conquistas' });
  }
};