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

        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "id invalide" });
        }

        const scenario = await scenarioDao.findById(id);

        if (!scenario) {
            return res.status(404).json({ message: "Scenario introuvable" });
        }

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
        const {
            titre,
            description,
            type,
            source,
            auteurId,
            genreId,
            systemeJeuId,
            anneePublication
        } = req.body || {};

        if (typeof titre !== "string" || titre.trim() === "")
            return res.status(400).json({ message: "titre requis" });

        if (typeof description !== "string" || description.trim() === "")
            return res.status(400).json({ message: "description requise" });

        const created = await scenarioDao.create({
            titre: titre.trim(),
            description: description.trim(),
            type,
            source: source?.trim(),
            auteurId: Number(auteurId),
            genreId: Number(genreId),
            systemeJeuId: Number(systemeJeuId),

            // conversion année -> Date
            ...(anneePublication && {
                anneePublication: new Date(`${anneePublication}-01-01`)
            })
        });

        return res.status(201).json(created);
    } catch (err) {
        return next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "id invalide" });
        }

        const data = req.body || {};
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: "Body vide" });
        }

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

        if ("auteurId" in data) {
            const aId = Number(data.auteurId);
            if (!Number.isInteger(aId))
                return res.status(400).json({ message: "auteurId invalide" });
            patch.auteurId = aId;
        }

        if ("genreId" in data) {
            const gId = Number(data.genreId);
            if (!Number.isInteger(gId))
                return res.status(400).json({ message: "genreId invalide" });
            patch.genreId = gId;
        }

        if ("systemeJeuId" in data) {
            const sId = Number(data.systemeJeuId);
            if (!Number.isInteger(sId))
                return res.status(400).json({ message: "systemeJeuId invalide" });
            patch.systemeJeuId = sId;
        }

        if ("anneePublication" in data) {
            const year = Number(data.anneePublication);
            if (!Number.isInteger(year)) {
                return res.status(400).json({ message: "anneePublication invalide" });
                patch.anneePublication = new Date(`${year}-01-01`);
            }

            patch.anneePublication = new Date(`${year}-01-01`);
        }
        const existing = await scenarioDao.findById(id);
        if (!existing) {
            return res.status(404).json({ message: "Scenario introuvable" });
        }

        const updated = await scenarioDao.update(id, patch);
        return res.json(updated);
    } catch (err) {
        return next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "id invalide" });
        }

        const existing = await scenarioDao.findById(id);

        if (!existing) {
            return res.status(404).json({ message: "Scenario introuvable" });
        }

        await scenarioDao.remove(id);

        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getAll,
    getById,
    getByFiltres,
    create,
    update,
    remove,
};