const express = require("express");
const roleRouter = express.Router();

const { creatRole, allRole } = require('../Controllers/role');
const authentication = require("../midleware/auth");
const authorization = require("../midleware/outh");


roleRouter.get("/",authentication,authorization, allRole)
roleRouter.post("/create", authentication,authorization, creatRole)



module.exports = roleRouter;