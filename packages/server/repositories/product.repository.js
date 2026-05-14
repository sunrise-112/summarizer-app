import { prisma } from "../prisma/lib/prisma.js";

export const productRepository = {
  async getProduct(productId) {
    return await prisma.product.findUnique({
      where: { id: productId },
    });
  },
};
