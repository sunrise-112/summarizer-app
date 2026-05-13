import { reviewService } from "../services/review.service.js";

export const reviewsController = {
  getAll: async (req, res) => {
    const reviews = await reviewService.getAll();

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully!",
      data: reviews,
    });
  },

  getProductReviews: async (req, res) => {
    const productId = Number(req.params.id);
    if (isNaN(productId))
      return res.status(400).json({
        error: "Product Id is required!",
      });

    const fetchedReviews = await reviewService.getProductReviews(productId);
    if (!fetchedReviews)
      return res
        .status(404)
        .json({ error: "Reviews for given product ID was not found!" });

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully!",
      data: fetchedReviews,
    });
  },
};
