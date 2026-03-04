const genreDao = require("../dao/genre.dao");

const getAll = async (req, res, next) => {
    try {
        return res.json(await genreDao.findAll());
    } catch (err) {
        return next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ message: "id invalide" });

        const genre = await genreDao.findById(id);
        if (!genre) return res.status(404).json({ message: "Genre introuvable" });

        return res.json(genre);
    } catch (err) {
        return next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { nom, description } = req.body || {};

        if (typeof nom !== "string" || nom.trim() === "")
            return res.status(400).json({ message: "nom requis" });

        if (typeof description !== "string" || description.trim() === "")
            return res.status(400).json({ message: "description requise" });

        const created = await genreDao.create({
            nom: nom.trim(),
            description: description.trim(),
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

        const existing = await genreDao.findById(id);
        if (!existing) return res.status(404).json({ message: "Genre introuvable" });

        return res.json(await genreDao.update(id, patch));
    } catch (err) {
        return next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) return res.status(400).json({ message: "id invalide" });

        const existing = await genreDao.findById(id);
        if (!existing) return res.status(404).json({ message: "Genre introuvable" });

        await genreDao.remove(id);
        return res.status(204).send();
    } catch (err) {
        return next(err);
    }
};

module.exports = { getAll, getById, create, update, remove };