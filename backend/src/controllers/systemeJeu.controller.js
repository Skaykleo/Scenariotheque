const systemeJeuDao = require("../dao/systemeJeu.dao");

const getAll = async (req, res, next) => {
  try {
    const systemesJeu = await systemeJeuDao.findAll();
    return res.json(systemesJeu);
  } catch (err) {
    return next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "id invalide" });

    const systemeJeu = await systemeJeuDao.findById(id);
    if (!systemeJeu) return res.status(404).json({ message: "Système de jeu introuvable" });

    return res.json(systemeJeu);
  } catch (err) {
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { nom, description, source, auteurId } = req.body || {};

    if (typeof nom !== "string" || nom.trim() === "")
      return res.status(400).json({ message: "nom requis" });

    if (typeof description !== "string" || description.trim() === "")
      return res.status(400).json({ message: "description requise" });

    if (typeof source !== "string" || source.trim() === "")
      return res.status(400).json({ message: "source requise" });

    const aId = Number(auteurId);
    if (!Number.isInteger(aId)) return res.status(400).json({ message: "auteurId invalide" });

    const created = await systemeJeuDao.create({
      nom: nom.trim(),
      description: description.trim(),
      source: source.trim(),
      auteurId: aId,
    });

    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "id invalide" });

    const data = req.body || {};
    if (Object.keys(data).length === 0) return res.status(400).json({ message: "Body vide" });

    const patch = {};

    if ("nom" in data) {
      if (typeof data.nom !== "string" || data.nom.trim() === "")
        return res.status(400).json({ message: "nom invalide" });
      patch.nom = data.nom.trim();
    }

    if ("description" in data) {
      if (typeof data.description !== "string" || data.description.trim() === "")
        return res.status(400).json({ message: "description invalide" });
      patch.description = data.description.trim();
    }

    if ("source" in data) {
      if (typeof data.source !== "string" || data.source.trim() === "")
        return res.status(400).json({ message: "source invalide" });
      patch.source = data.source.trim();
    }

    if ("auteurId" in data) {
      const aId = Number(data.auteurId);
      if (!Number.isInteger(aId)) return res.status(400).json({ message: "auteurId invalide" });
      patch.auteurId = aId;
    }

    const existing = await systemeJeuDao.findById(id);
    if (!existing) return res.status(404).json({ message: "Système de jeu introuvable" });

    const updated = await systemeJeuDao.update(id, patch);
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "id invalide" });

    const existing = await systemeJeuDao.findById(id);
    if (!existing) return res.status(404).json({ message: "Système de jeu introuvable" });

    await systemeJeuDao.remove(id);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };