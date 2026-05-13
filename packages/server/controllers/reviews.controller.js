import { reviewService } from "../services/review.service.js";

export const reviewsController = {
  async getAll(req, res) {
    const reviews = await reviewService.getAll();

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully!",
      data: reviews,
    });
  },

  async getProductReviews(req, res) {
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

  async summarizeReviews(req, res) {
    const productId = Number(req.params.id);
    if (isNaN(productId))
      return res.status(400).json({
        error: "Product Id is required!",
      });

    const summary = await reviewService.sumarizeReviews(productId, 10);
    res.status(200).json({ summary });
  },
};
