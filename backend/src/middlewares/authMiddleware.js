const isAuthenticated = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Non authentifié" });
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({ message: "Accès refusé" });
  }
  next();
};

module.exports = { isAuthenticated, isAdmin };
