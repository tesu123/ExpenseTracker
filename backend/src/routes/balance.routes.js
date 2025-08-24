import { Router } from "express";
import { getBalance } from "../controllers/balance.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-balance").get(verifyJWT, getBalance);

export default router;
