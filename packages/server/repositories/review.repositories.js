import { prisma } from "../prisma/lib/prisma.js";
import dayjs from "dayjs";

export const reviewRepository = {
  async getProductReviews(productId) {
    return prisma.review.findMany({
      where: { productId },
    });
  },

  async getMany(productId, limit) {
    return await prisma.review.findMany({
      where: { productId },
      take: limit,
    });
  },

  async storeReviewSummary(productId, summary) {
    const today = new Date();
    const expiresAt = dayjs().add(7, "days").toDate();

    const data = {
      content: summary,
      generatedAt: today,
      expiresAt,
      productId,
    };

    await prisma.summary.upsert({
      where: { productId },
      create: data,
      update: data,
    });
  },

  async getReviewsSummary(productId) {
    const summary = await prisma.summary.findFirst({
      where: {
        AND: [{ productId }, { expiresAt: { gt: new Date() } }],
      },
    });

    return summary ? summary.content : null;
  },
};
