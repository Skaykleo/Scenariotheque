const prisma = require("../config/prisma");

const includeScenario = {
  auteur: true,
  genre: true,
  systemesJeu: { include: { systemeJeu: true } },
};

const findAll = async () => {
  return prisma.scenario.findMany({
    include: includeScenario,
  });
};

const findById = async (id) => {
  return prisma.scenario.findUnique({
    where: { id },
    include: includeScenario,
  });
};

const findByFiltres = async ({
  genreId,
  auteurId,
  systemeJeuId,
  type,
  anneePublication,
} = {}) => {
  return prisma.scenario.findMany({
    where: {
      ...(genreId && { genreId }),
      ...(auteurId && { auteurId }),
      ...(type && { type }),
      ...(anneePublication && {
        anneePublication: {
          gte: new Date(`${anneePublication}-01-01`),
          lte: new Date(`${anneePublication}-12-31`),
        },
      }),
      ...(systemeJeuId && {
        systemesJeu: {
          some: { systemeJeuId },
        },
      }),
    },
    include: includeScenario,
  });
};

const create = async (data) => {
  const { systemeJeuIds, ...scenarioData } = data;

  return prisma.scenario.create({
    data: {
      ...scenarioData,
      ...(Array.isArray(systemeJeuIds) && systemeJeuIds.length > 0
        ? {
            systemesJeu: {
              create: systemeJeuIds.map((id) => ({ systemeJeuId: id })),
            },
          }
        : {}),
    },
    include: includeScenario,
  });
};

const update = async (id, data) => {
  const { systemeJeuIds, ...patch } = data;

  return prisma.scenario.update({
    where: { id },
    data: {
      ...patch,
      ...(Array.isArray(systemeJeuIds)
        ? {
            systemesJeu: {
              deleteMany: {},
              create: systemeJeuIds.map((sid) => ({ systemeJeuId: sid })),
            },
          }
        : {}),
    },
    include: includeScenario,
  });
};

const remove = async (id) => {
  return prisma.scenario.delete({ where: { id } });
};

module.exports = { findAll, findById, findByFiltres, create, update, remove };