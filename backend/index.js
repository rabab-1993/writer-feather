const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
// const passport = require("passport");
// require("./passport")(passport);
const helmet = require("helmet");

// imported the db file
require("./DB/index");

const app = express();

//  Middlewares
app.use(helmet());
app.use(express.json({ limit: "70mb", extended: true }));
app.use(express.urlencoded({ limit: "70mb", extended: false }));
app.use(cors());
app.use(morgan("dev"));
// app.use(passport.initialize());

// import all routers

// user router
// const userRouter = require("./Routers/Routes/user");
// app.use("/user", userRouter);
// // role router
// const roleRouter = require("./Routers/Routes/role");
// app.use("/role", roleRouter);
// // post router
// const postRouter = require("./Routers/Routes/post");
// app.use("/posts", postRouter);
// // comment router
// const commentRouter = require("./Routers/Routes/comment");
// app.use("/comment", commentRouter);
// // comment router
// const likeRouter = require("./Routers/Routes/like");
// app.use("/like", likeRouter);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
