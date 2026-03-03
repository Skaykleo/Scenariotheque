const prisma = require("../config/prisma");

const findAll = async () => {
  return prisma.systemeJeu.findMany({
    include: { auteur: true },
  });
};

const findById = async (id) => {
  return prisma.systemeJeu.findUnique({
    where: { id },
    include: { auteur: true },
  });
};

const create = async (data) => {
  return prisma.systemeJeu.create({
    data,
    include: { auteur: true },
  });
};

const update = async (id, data) => {
  return prisma.systemeJeu.update({
    where: { id },
    data,
    include: { auteur: true },
  });
};

const remove = async (id) => {
  return prisma.systemeJeu.delete({ where: { id } });
};

module.exports = { findAll, findById, create, update, remove };
