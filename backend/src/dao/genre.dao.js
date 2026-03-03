const prisma = require("../config/prisma");

const findAll = async () => {
  return prisma.genre.findMany();
};

const findById = async (id) => {
  return prisma.genre.findUnique({
    where: { id },
  });
};

const create = async (data) => {
  return prisma.genre.create({ data });
};

const update = async (id, data) => {
  return prisma.genre.update({
    where: { id },
    data,
  });
};

const remove = async (id) => {
  return prisma.genre.delete({ where: { id } });
};

module.exports = { findAll, findById, create, update, remove };
