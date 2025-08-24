import { Router } from "express";
import {
  addExpense,
  getMonthlyExpense,
  getAllExpenses,
  deleteExpense,
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-expense").post(verifyJWT, addExpense);
router.route("/get-monthly-expense").get(verifyJWT, getMonthlyExpense);
router.route("/get-all-expenses").get(verifyJWT, getAllExpenses);
router.route("/delete-expense/:id").delete(verifyJWT, deleteExpense);

export default router;
