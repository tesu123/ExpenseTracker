import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../config/db.js";

// ➕ Add Income
export const addIncome = async (req, res, next) => {
  try {
    const { amount, category, description } = req.body;
    const userId = req.user?.id; // from JWT middleware

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    if (!amount || !category) {
      throw new ApiError(400, "Amount and Category are required");
    }

    const income = await prisma.income.create({
      data: {
        amount: parseFloat(amount),
        category,
        description: description || "",
        userId,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, income, "Income added successfully"));
  } catch (error) {
    next(error);
  }
};

// 📅 Get Total Income for Current Month
export const getMonthlyIncome = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // first day of month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1); // first day of next month

    const monthlyIncome = await prisma.income.aggregate({
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
          { totalMonthlyIncome: monthlyIncome._sum.amount || 0 },
          "Monthly income calculated successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

// 📄 Get All Incomes of User
export const getAllIncomes = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    const incomes = await prisma.income.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // ✅ schema has createdAt, not date
    });

    return res
      .status(200)
      .json(new ApiResponse(200, incomes, "Incomes fetched successfully"));
  } catch (error) {
    next(error);
  }
};

// 🗑 Delete Income
export const deleteIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    const income = await prisma.income.findUnique({ where: { id } });

    if (!income || income.userId !== userId) {
      throw new ApiError(404, "Income not found or unauthorized");
    }

    await prisma.income.delete({ where: { id } });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Income deleted successfully"));
  } catch (error) {
    next(error);
  }
};

// ✏️ Edit Income
export const editIncome = async (req, res, next) => {
  try {
    const { id } = req.params; // income id
    const { amount, category, description } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized - User not found");
    }

    // 🔍 Check if income exists and belongs to user
    const income = await prisma.income.findUnique({ where: { id } });

    if (!income || income.userId !== userId) {
      throw new ApiError(404, "Income not found or unauthorized");
    }

    // 🔄 Update income
    const updatedIncome = await prisma.income.update({
      where: { id },
      data: {
        ...(amount && { amount: parseFloat(amount) }),
        ...(category && { category }),
        ...(description !== undefined && { description }),
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, updatedIncome, "Income updated successfully"));
  } catch (error) {
    next(error);
  }
};
