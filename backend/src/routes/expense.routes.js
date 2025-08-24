import { Router } from "express";
import {
  addExpense,
  getExpenses,
  deleteExpense,
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-expense").post(verifyJWT, addExpense);
router.route("/get-expense").get(verifyJWT, getExpenses);
router.route("/delete-expense/:id").delete(verifyJWT, deleteExpense);

export default router;
