const auteurDao = require("../dao/auteur.dao");

const getAll = async (req, res, next) => {
    try {
        const auteurs = await auteurDao.findAll();
        return res.json(auteurs);
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

        const auteur = await auteurDao.findById(id);

        if (!auteur) {
            return res.status(404).json({ message: "Auteur introuvable" });
        }

        return res.json(auteur);
    } catch (err) {
        return next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { nom, prenom } = req.body || {};

        if (typeof nom !== "string" || nom.trim() === "") {
            return res.status(400).json({ message: "nom requis" });
        }

        if (typeof prenom !== "string" || prenom.trim() === "") {
            return res.status(400).json({ message: "prenom requis" });
        }

        const created = await auteurDao.create({
            nom: nom.trim(),
            prenom: prenom.trim(),
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

        if ("nom" in data) {
            if (typeof data.nom !== "string" || data.nom.trim() === "") {
                return res.status(400).json({ message: "nom invalide" });
            }
            patch.nom = data.nom.trim();
        }

        if ("prenom" in data) {
            if (typeof data.prenom !== "string" || data.prenom.trim() === "") {
                return res.status(400).json({ message: "prenom invalide" });
            }
            patch.prenom = data.prenom.trim();
        }

        const existing = await auteurDao.findById(id);

        if (!existing) {
            return res.status(404).json({ message: "Auteur introuvable" });
        }

        const updated = await auteurDao.update(id, patch);

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

        const existing = await auteurDao.findById(id);

        if (!existing) {
            return res.status(404).json({ message: "Auteur introuvable" });
        }

        await auteurDao.remove(id);

        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};