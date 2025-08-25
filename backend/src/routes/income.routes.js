import { Router } from "express";
import {
  addIncome,
  getMonthlyIncome,
  getAllIncomes,
  deleteIncome,
  editIncome,
} from "../controllers/income.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-income").post(verifyJWT, addIncome);
router.route("/get-monthly-income").get(verifyJWT, getMonthlyIncome);
router.route("/delete-income/:id").delete(verifyJWT, deleteIncome);
router.route("/edit-income/:id").put(verifyJWT, editIncome);
router.route("/get-all-incomes").get(verifyJWT, getAllIncomes);

export default router;
