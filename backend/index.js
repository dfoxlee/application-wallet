import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import morgan from "morgan";

// utils
import limiter from "./utils/limiter.js";

// middlewares
import { errorMiddleware } from "./middleware/error-middleware.js";

// routes
import authRouter from "./routes/auth-routes.js";

const __dirname = path.resolve();

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
   flags: "a",
});

const app = express();
const PORT = process.env.PORT || 4004;

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/auth", authRouter);

app.get("/test", (req, res) => {
   res.send("API is working!");
});

app.get("/test-error", (req, res, next) => {
   try {
      throw new Error("Test error");
   } catch (error) {
      next(error);
   }
});

app.use(errorMiddleware);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
