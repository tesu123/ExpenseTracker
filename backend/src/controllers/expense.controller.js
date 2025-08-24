import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../config/db.js";

// ➕ Add Expense
export const addExpense = async (req, res, next) => {
  try {
    const { amount, category, description } = req.body;
    const userId = req.user?.id; // from JWT middleware

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    if (!amount || !category) {
      throw new ApiError(400, "Amount and Category are required");
    }

    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        description: description || "", // optional field
        userId,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, expense, "Expense added successfully"));
  } catch (error) {
    next(error);
  }
};

// 📅 Get Total Expense for Current Month
export const getMonthlyExpense = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // first day of month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1); // first day of next month

    const monthlyExpense = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { totalMonthlyExpense: monthlyExpense._sum.amount || 0 },
          "Monthly expense calculated successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

// 📄 Get All Expenses of User
export const getAllExpenses = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // order by createdAt since schema has it
    });

    return res
      .status(200)
      .json(new ApiResponse(200, expenses, "Expenses fetched successfully"));
  } catch (error) {
    next(error);
  }
};

// 🗑 Delete Expense
export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    const expense = await prisma.expense.findUnique({ where: { id } });

    if (!expense || expense.userId !== userId) {
      throw new ApiError(404, "Expense not found or unauthorized");
    }

    await prisma.expense.delete({ where: { id } });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Expense deleted successfully"));
  } catch (error) {
    next(error);
  }
};
