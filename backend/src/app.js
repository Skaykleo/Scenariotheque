const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./config/passport");
const router = require("./routes/index");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(
  session({
    store: new pgSession({
      conString: process.env.DATABASE_URL,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
      httpOnly: true,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
