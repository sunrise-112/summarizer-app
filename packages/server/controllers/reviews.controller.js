import { prisma } from "../../server/prisma/lib/prisma.js";

export const reviewsController = {
  getAll: async (req, res) => {
    const reviews = await prisma.review.findMany();

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully!",
      data: reviews,
    });
  },
  getById: async (req, res) => {
    const productId = Number(req.params.id);
    if (isNaN(productId))
      return res.status(400).json({
        error: "Product Id is required!",
      });

    const fetchedReview = await prisma.review.findFirst({
      where: { productId },
    });

    if (!fetchedReview)
      return res
        .status(404)
        .json({ error: "Product with given ID was not found!" });

    res.status(200).json({
      success: true,
      message: "Review fetched successfully!",
      data: fetchedReview,
    });
  },
};
