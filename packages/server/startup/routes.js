import express from "express";
import cors from "cors";
import helmet from "helmet";

import reviewsRoutes from "../routes/reviews.routes.js";
import error from "../middlewares/error.js";

export default (app) => {
  app.use(cors());
  app.use(helmet());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/products", reviewsRoutes);

  app.use(error);
};
