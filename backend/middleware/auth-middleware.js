import jwt from "jsonwebtoken";
import { getUserByEmail } from "../services/auth-services";

export const authMiddleware = async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
         .status(401)
         .json({ message: "Unauthorized: No token provided" });
   }

   const token = authHeader.split(" ")[1];

   try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await getUserByEmail(email);

      if (!user) {
         throw new Error("Unauthorized: User not found");
      }

      req.user = user;
      next();
   } catch (error) {
      next(error);
   }
};
