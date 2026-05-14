import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { prisma } from "../../server/prisma/lib/prisma.js";
import { llmClient } from "../llm/client.js";
import { reviewRepository } from "../repositories/review.repositories.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const template = fs.readFileSync(
  path.join(__dirname, "..", "prompts", "summarizer.prompt.txt"),
  "utf-8"
);

export const reviewService = {
  async summarizeReviews(productId, limit) {
    const existingSummary = await reviewRepository.getReviewsSummary(productId);
    if (existingSummary) {
      return existingSummary;
    }

    const reviews = await reviewRepository
      .getMany(productId, limit)
      .then((data) => data.map((d) => d?.content).join("\n\n"));

    const prompt = template.replace("{{reviews}}", reviews);

    const { message: summary } = await llmClient.generateText({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    await reviewRepository.storeReviewSummary(productId, summary);

    return summary;
  },
};
