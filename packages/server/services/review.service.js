import { prisma } from "../../server/prisma/lib/prisma.js";

export const reviewService = {
  getAll: async () => {
    return prisma.review.findMany();
  },

  getProductReviews: async (productId) => {
    return prisma.review.findMany({
      where: { productId },
    });
  },
};
