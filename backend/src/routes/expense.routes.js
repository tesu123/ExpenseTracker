import { Router } from "express";
import {
  addExpense,
  getMonthlyExpense,
  getAllExpenses,
  deleteExpense,
  editExpense,
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-expense").post(verifyJWT, addExpense);
router.route("/get-monthly-expense").get(verifyJWT, getMonthlyExpense);
router.route("/get-all-expenses").get(verifyJWT, getAllExpenses);
router.route("/delete-expense/:id").delete(verifyJWT, deleteExpense);
router.route("/edit-expense/:id").put(verifyJWT, editExpense);

export default router;
