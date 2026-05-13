import express from "express";
const router = express.Router();

// Controller
import { reviewsController } from "../controllers/reviews.controller.js";

router.get("/all", reviewsController.getAll);
router.get("/:id/reviews", reviewsController.getProductReviews);
router.post("/:id/reviews/summarize", reviewsController.summarizeReviews);

export default router;
