import passport from "passport";
import LocalStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import { UserModel } from "../dao/models/user.model.js";
import { createHash } from "../server/utils.js";

const initializedPassport = () => {
  passport.use(
    "signupStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
        passreqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { name } = req.body;
          const user = await UserModel.findOne({ email: username });
          if (user) {
            return done(null, false);
          }
          const newUser = {
            email: username,
            password: createHash(password),
          };
          const userCreated = await userModel.create(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  //github

  passport.use(
    "githubSignup",
    new GithubStrategy(
      {
        clientID: "github client id",
        clientSecret: "GITHUB CLIENT SECRET",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("profile", profile);
          const userExist = await UserModel.findOne({
            email: profile.username,
          });
          if (userExist) {
            return done(null, userExist);
          }
          const newUser = {
            email: profile.username,
            password: createHash(profile.id),
          };
          const userCreated = await UserModel.create(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  //serial
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    return done(null, user);
  });
};

export { initializedPassport };
