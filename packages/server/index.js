import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import routes from "./startup/routes.js";

routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
