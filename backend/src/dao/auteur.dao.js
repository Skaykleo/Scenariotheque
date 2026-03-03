const prisma = require("../config/prisma");

const findAll = async () => {
  return prisma.auteur.findMany();
};

const findById = async (id) => {
  return prisma.auteur.findUnique({
    where: { id },
  });
};

const create = async (data) => {
  return prisma.auteur.create({ data });
};

const update = async (id, data) => {
  return prisma.auteur.update({
    where: { id },
    data,
  });
};

const remove = async (id) => {
  return prisma.auteur.delete({ where: { id } });
};

module.exports = { findAll, findById, create, update, remove };
