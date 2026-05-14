import express from "express";
const router = express.Router();

// Controller
import { reviewsController } from "../controllers/reviews.controller.js";

router.get("/:id/reviews", reviewsController.getReviews);
router.post("/:id/reviews/summarize", reviewsController.summarizeReviews);

export default router;
