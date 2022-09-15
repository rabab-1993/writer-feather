import { Router } from "express";
const roleRouter = Router();

import { creatRole, allRole } from '../Controllers/role.js';
import authentication from "../midleware/auth.js";
import authorization from "../midleware/outh.js";


roleRouter.get("/role",authentication,authorization, allRole)
roleRouter.post("/role", authentication,authorization, creatRole)



export default roleRouter;