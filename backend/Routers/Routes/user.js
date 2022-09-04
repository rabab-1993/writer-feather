const express = require("express");
const {
  register,
  logIn,
  allUser,
  deleteUser,
  undeleteUser,
  activated,
  forgetPass,
  updatePass,
  profile,
  updateProfile,
} = require("../Controllers/user");
const authentication = require("../midleware/auth");
const authorization = require("../midleware/outh");
const passport = require("passport");
const { googlePass } = require("../../passport");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.get("/activated/:token", activated);
userRouter.post("/login", logIn);
userRouter.put("/forget", forgetPass);
userRouter.get("/reset-pass/:res-tok", updatePass);
userRouter.get("/profile", authentication, profile);
userRouter.put("/update", authentication, updateProfile);

// log with Google
userRouter.get(
  "/user/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

userRouter.get(
  "/user/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/post");
  }
);

// just for admin
userRouter.get("/users", authentication, authorization, allUser);
userRouter.delete("/delete-user", authentication, authorization, deleteUser);
userRouter.put("/undelete-user", authentication, authorization, undeleteUser);

module.exports = userRouter;
