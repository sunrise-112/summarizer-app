import { reviewService } from "../services/review.service.js";
import { productRepository } from "../repositories/product.repository.js";
import { reviewRepository } from "../repositories/review.repositories.js";

export const reviewsController = {
  async getReviews(req, res) {
    try {
      const productId = Number(req.params.id);
      if (isNaN(productId))
        return res.status(400).json({
          error: "Product Id is required!",
        });

      const product = await productRepository.getProduct(productId);
      if (!product) {
        res.status(404).json({ error: "Product not found!" });
        return;
      }

      const reviews = await reviewRepository.getProductReviews(productId);
      const summary = await reviewRepository.getReviewsSummary(productId);

      res.status(200).json({
        summary,
        reviews,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  },

  async summarizeReviews(req, res) {
    const productId = Number(req.params.id);
    if (isNaN(productId))
      return res.status(400).json({
        error: "Product Id is required!",
      });

    const product = await productRepository.getProduct(productId);
    if (!product) {
      res.status(404).json({ error: " Product not found!" });
      return;
    }

    const reviews = await reviewRepository.getMany(productId, 1);
    if (!reviews.length) {
      res.status(404).json({ error: "No reviews found!" });
      return;
    }

    const summary = await reviewService.summarizeReviews(productId, 10);

    res.status(200).json({ summary });
  },
};
