const prisma = require("../config/prisma");

const findAll = async () => {
  return prisma.scenario.findMany({
    include: { auteur: true, genre: true, systemeJeu: true },
  });
};

const findById = async (id) => {
  return prisma.scenario.findUnique({
    where: { id },
    include: { auteur: true, genre: true, systemeJeu: true },
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
      ...(systemeJeuId && { systemeJeuId }),
      ...(type && { type }),
      ...(anneePublication && {
        anneePublication: {
          gte: new Date(`${anneePublication}-01-01`),
          lte: new Date(`${anneePublication}-12-31`),
        },
      }),
    },
    include: { auteur: true, genre: true, systemeJeu: true },
  });
};

const create = async (data) => {
  return prisma.scenario.create({
    data,
    include: { auteur: true, genre: true, systemeJeu: true },
  });
};

const update = async (id, data) => {
  return prisma.scenario.update({
    where: { id },
    data,
    include: { auteur: true, genre: true, systemeJeu: true },
  });
};

const remove = async (id) => {
  return prisma.scenario.delete({ where: { id } });
};

module.exports = { findAll, findById, findByFiltres, create, update, remove };
