import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import prisma from "../config/db.js";

// 📊 Get Balance (Income - Expenses)
export const getBalance = async (req, res, next) => {
  try {
    const userId = req.user?.id; // from JWT middleware

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    const incomeSum = await prisma.income.aggregate({
      _sum: { amount: true },
      where: { userId },
    });

    const expenseSum = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: { userId },
    });

    const balance =
      (incomeSum._sum.amount || 0) - (expenseSum._sum.amount || 0);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { balance }, "Balance calculated successfully")
      );
  } catch (error) {
    next(error);
  }
};
