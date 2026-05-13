import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { prisma } from "../../server/prisma/lib/prisma.js";
import { llmClient } from "../llm/client.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const template = fs.readFileSync(
  path.join(__dirname, "..", "prompts", "summarizer.prompt.txt"),
  "utf-8"
);

export const reviewService = {
  async getAll() {
    return prisma.review.findMany();
  },

  async getProductReviews(productId) {
    return prisma.review.findMany({
      where: { productId },
    });
  },

  async sumarizeReviews(productId, limit) {
    const reviews = await prisma.review
      .findMany({
        where: { productId },
        take: limit,
      })
      .then((data) => data.map((d) => d.content).join("\n\n"));

    const prompt = template.replace("{{reviews}}", reviews);

    const summary = await llmClient.generateText({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return summary.message;
  },
};
