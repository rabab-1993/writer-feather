import { Router } from "express";
import {
  register,
  logIn,
  allUser,
  deleteUser,
  undeleteUser,
  emailActivate,
  forgetPass,
  updatePass,
  profile,
  updateProfile,
} from "../Controllers/user.js";

import authentication from "../Midleware/auth.js";
import authorization from "../Midleware/outh.js";
const userRouter = Router();

userRouter.post("/user", register);
userRouter.get("/user/email-activate/:token", emailActivate);
userRouter.post("/user/login", logIn);
userRouter.put("/user/forget", forgetPass);
userRouter.get("/user/reset-pass/:res-tok", updatePass);
userRouter.get("/user/profile", authentication, profile);
userRouter.put("/user/profile", authentication, updateProfile);


// just for admin
userRouter.get("/user", authentication, authorization, allUser);
userRouter.delete("/user", authentication, authorization, deleteUser);
userRouter.put("/user", authentication, authorization, undeleteUser);

export default userRouter;
