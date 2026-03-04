const express = require("express");
const router = express.Router();

const genreController = require("../controllers/genre.controller");
const auteurController = require("../controllers/auteur.controller");
const scenarioController = require("../controllers/scenario.controller");
const systemeJeuController = require("../controllers/systemeJeu.controller");

router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Scénariothèque API is alive" });
});

router.get("/genres", genreController.getAll);
router.get("/genres/:id", genreController.getById);
router.post("/genres", genreController.create);
router.put("/genres/:id", genreController.update);
router.delete("/genres/:id", genreController.remove);

router.get("/auteurs", auteurController.getAll);
router.get("/auteurs/:id", auteurController.getById);
router.post("/auteurs", auteurController.create);
router.put("/auteurs/:id", auteurController.update);
router.delete("/auteurs/:id", auteurController.remove);

router.get("/systemes-jeu", systemeJeuController.getAll);
router.get("/systemes-jeu/:id", systemeJeuController.getById);
router.post("/systemes-jeu", systemeJeuController.create);
router.put("/systemes-jeu/:id", systemeJeuController.update);
router.delete("/systemes-jeu/:id", systemeJeuController.remove);

router.get("/scenarios", scenarioController.getAll);
router.get("/scenarios/:id", scenarioController.getById);
router.post("/scenarios", scenarioController.create);
router.put("/scenarios/:id", scenarioController.update);
router.delete("/scenarios/:id", scenarioController.remove);

module.exports = router;
