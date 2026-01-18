import logger from "../utils/logger.js";

export const errorMiddleware = (err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || "Internal Server Error";

   console.error(err.stack);
   logger.error(`${req.method} ${req.originalUrl} - ${message}`);

   res.status(statusCode).json({ message });
};
