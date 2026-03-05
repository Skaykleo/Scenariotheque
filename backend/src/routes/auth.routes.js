const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  },
);

router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Non authentifié" });
  res.json(req.user);
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return res.status(500).json({ message: "Erreur lors de la déconnexion" });
    res.json({ message: "Déconnecté" });
  });
});

module.exports = router;
