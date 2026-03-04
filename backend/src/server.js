require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const app = require("./app");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Scénariothèque API running on http://localhost:${PORT}`);
});
