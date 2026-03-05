const prisma = require("../config/prisma");

const includeSystemeJeu = {
  auteur: true,
  scenarios: { include: { scenario: true } },
};

const findAll = async () => {
  return prisma.systemeJeu.findMany({ include: includeSystemeJeu });
};

const findById = async (id) => {
  return prisma.systemeJeu.findUnique({
    where: { id },
    include: includeSystemeJeu,
  });
};

const create = async (data) => {
  return prisma.systemeJeu.create({
    data,
    include: includeSystemeJeu,
  });
};

const update = async (id, data) => {
  return prisma.systemeJeu.update({
    where: { id },
    data,
    include: includeSystemeJeu,
  });
};

const remove = async (id) => {
  return prisma.systemeJeu.delete({ where: { id } });
};

module.exports = { findAll, findById, create, update, remove };