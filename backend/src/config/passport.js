const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const prisma = require("./prisma");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const userName = profile.displayName;
        const googleId = profile.id;

        let user = await prisma.user.findUnique({ where: { googleId } });

        if (!user) {
          user = await prisma.user.create({
            data: { googleId, email, userName },
          });
        }

        return done(null, { ...user, type: "user" });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, type: user.type });
});

passport.deserializeUser(async ({ id, type }, done) => {
  try {
    let user;
    if (type === "admin") {
      user = await prisma.admin.findUnique({ where: { id } });
    } else {
      user = await prisma.user.findUnique({ where: { id } });
    }
    done(null, { ...user, type });
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
