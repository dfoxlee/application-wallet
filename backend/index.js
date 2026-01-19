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
import {authMiddleware} from "./middleware/auth-middleware.js";
import { errorMiddleware } from "./middleware/error-middleware.js";

// routes
import authRouter from "./routes/auth-routes.js";
import applicationRouter from "./routes/application-routes.js";

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

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/applications", authMiddleware, applicationRouter);

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

// error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
