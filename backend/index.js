import express, { json, urlencoded } from "express";
import { config } from "dotenv";
config();
import morgan from "morgan";
import cors from "cors";
// const passport = require("passport");
// require("./passport")(passport);
import helmet from "helmet";

// imported the db file
import "./DB/index.js";

const app = express();

//  Middlewares
app.use(helmet());
app.use(json({ limit: "70mb", extended: true }));
app.use(urlencoded({ limit: "70mb", extended: false }));
app.use(cors());
app.use(morgan("dev"));
// app.use(passport.initialize());

// import all routers

// role router
import rolRouter from './Routers/Routes/role.js';
app.use("/api", rolRouter);
// user router
import userRouter from "./Routers/Routes/user.js";
app.use("/api", userRouter);
// story router
import storyRouter from "./Routers/Routes/story.js";
app.use("/api", storyRouter);
// // comment router
// const commentRouter = require("./Routers/Routes/comment");
// app.use("/api", commentRouter);
// // comment router
// const likeRouter = require("./Routers/Routes/like");
// app.use("/api", likeRouter);



const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
