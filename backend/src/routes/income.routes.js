import { Router } from "express";
import {
  addIncome,
  getIncomes,
  deleteIncome,
} from "../controllers/income.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-income").post(verifyJWT, addIncome);
router.route("/get-income").get(verifyJWT, getIncomes);
router.route("/delete-income/:id").delete(verifyJWT, deleteIncome);

export default router;
