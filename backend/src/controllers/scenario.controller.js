
const scenarioDao = require("../dao/scenario.dao");

const getAll = async (req, res, next) => {
    try {
        const scenarios = await scenarioDao.findAll();
        return res.json(scenarios);
    } catch (err) {
        return next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ message: "id invalide" });

        const scenario = await scenarioDao.findById(id);
        if (!scenario) return res.status(404).json({ message: "Scenario introuvable" });

        return res.json(scenario);
    } catch (err) {
        return next(err);
    }
};

const getByFiltres = async (req, res, next) => {
    try {
        const { genreId, auteurId, systemeJeuId, type, anneePublication } = req.query;

        const scenarios = await scenarioDao.findByFiltres({
            genreId: genreId ? Number(genreId) : undefined,
            auteurId: auteurId ? Number(auteurId) : undefined,
            systemeJeuId: systemeJeuId ? Number(systemeJeuId) : undefined,
            type,
            anneePublication,
        });

        return res.json(scenarios);
    } catch (err) {
        return next(err);
    }
};

const create = async (req, res, next) => {
  try {
    const { titre, description, type, source, auteurId, genreIds, systemeJeuIds, anneePublication } = req.body || {};

    if (typeof titre !== "string" || titre.trim() === "") {
      return res.status(400).json({ message: "titre requis" });
    }

    if (typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ message: "description requise" });
    }

    if (typeof source !== "string" || source.trim() === "") {
      return res.status(400).json({ message: "source requise" });
    }

    const aId = Number(auteurId);
    if (!Number.isInteger(aId)) {
      return res.status(400).json({ message: "auteurId invalide" });
    }

    let gIds = undefined;
    if (genreIds !== undefined) {
      if (!Array.isArray(genreIds)) {
        return res.status(400).json({ message: "genreIds doit être un tableau" });
      }
      gIds = genreIds.map(Number);
      if (gIds.some((x) => !Number.isInteger(x))) {
        return res.status(400).json({ message: "genreIds doit contenir des entiers" });
      }
    }

    let sIds = undefined;
    if (systemeJeuIds !== undefined) {
      if (!Array.isArray(systemeJeuIds)) {
        return res.status(400).json({ message: "systemeJeuIds doit être un tableau" });
      }
      sIds = systemeJeuIds.map(Number);
      if (sIds.some((x) => !Number.isInteger(x))) {
        return res.status(400).json({ message: "systemeJeuIds doit contenir des entiers" });
      }
    }

    const created = await scenarioDao.create({
      titre: titre.trim(),
      description: description.trim(),
      type,
      source: source.trim(),
      auteurId: aId,
      ...(gIds ? { genreIds: gIds } : {}),
      ...(sIds ? { systemeJeuIds: sIds } : {}),
      ...(anneePublication ? { anneePublication: new Date(`${anneePublication}-01-01`) } : {}),
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

    if ("titre" in data) {
      if (typeof data.titre !== "string" || data.titre.trim() === "")
        return res.status(400).json({ message: "titre invalide" });
      patch.titre = data.titre.trim();
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

    if ("type" in data) {
      if (typeof data.type !== "string" || data.type.trim() === "")
        return res.status(400).json({ message: "type invalide" });
      patch.type = data.type.trim();
    }

    if ("auteurId" in data) {
      const aId = Number(data.auteurId);
      if (!Number.isInteger(aId)) return res.status(400).json({ message: "auteurId invalide" });
      patch.auteurId = aId;
    }

    // ✅ genreIds (remplace les liens M2M)
    if ("genreIds" in data) {
      if (!Array.isArray(data.genreIds)) {
        return res.status(400).json({ message: "genreIds doit être un tableau" });
      }
      const gIds = data.genreIds.map(Number);
      if (gIds.some((x) => !Number.isInteger(x))) {
        return res.status(400).json({ message: "genreIds doit contenir des entiers" });
      }
      patch.genreIds = gIds;
    }

    // ✅ systemeJeuIds (remplace les liens M2M)
    if ("systemeJeuIds" in data) {
      if (!Array.isArray(data.systemeJeuIds)) {
        return res.status(400).json({ message: "systemeJeuIds doit être un tableau" });
      }
      const sIds = data.systemeJeuIds.map(Number);
      if (sIds.some((x) => !Number.isInteger(x))) {
        return res.status(400).json({ message: "systemeJeuIds doit contenir des entiers" });
      }
      patch.systemeJeuIds = sIds;
    }

    if ("anneePublication" in data) {
      const year = Number(data.anneePublication);
      if (!Number.isInteger(year)) return res.status(400).json({ message: "anneePublication invalide" });
      patch.anneePublication = new Date(`${year}-01-01`);
    }

    const existing = await scenarioDao.findById(id);
    if (!existing) return res.status(404).json({ message: "Scenario introuvable" });

    const updated = await scenarioDao.update(id, patch);
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ message: "id invalide" });

        const existing = await scenarioDao.findById(id);
        if (!existing) return res.status(404).json({ message: "Scenario introuvable" });

        await scenarioDao.remove(id);
        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
};

module.exports = { getAll, getById, getByFiltres, create, update, remove };