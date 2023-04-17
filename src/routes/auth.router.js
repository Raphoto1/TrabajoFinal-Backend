import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../server/utils.js";
import passport from "passport";

const AuthRouter = Router();

//register
AuthRouter.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    res.send("usuario registrado");
  }
);
//falla de registro
AuthRouter.get("/failure-signup", (req, res) => {
  res.send("falla en el registro");
});
//reg por github
AuthRouter.get("/github", passport.authenticate("githubSignup"));
//callback de github
AuthRouter.get(
  "/github-callback",
  passport.authenticate("githubSignup", {
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    res.send("usuario autenticado");
  }
);

//login
AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const authorized = await UserModel.findOne({ email: email }).lean();
  if (!authorized) {
    res.send("ususario no identificado");
  } else {
    if (email === "adminCoder@coder.com") {
      req.session.user = email;
      req.session.rol = "admin";
      console.log(req.session);
    } else {
      if (isValidPassword(authorized, password)) {
        req.session.user = authorized._id;
        req.session.rol = "user";
        return res.send("login exitoso");
      } else {
        res.send("credenciales invalidas");
      }
    }
    return res.redirect("/products");
  }
});

//logOut
AuthRouter.post("/logout", (req, res) => {
  req.logOut((error) => {
    if (error) {
      return res.send("no se pudo cerrar la sesion");
    } else {
      req.session.destroy((err) => {
        if (error) {
          return res.send("no se pudo cerrar la sesion");
        }
        res.redirect("/login");
      });
    }
  });
});

export { AuthRouter };
