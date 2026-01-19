import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
   getUserByEmail,
   createUser,
   updateUser,
} from "../services/auth-services.js";
import { formatDateForDb } from "../utils/formatters.js";

export const signupController = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
         throw new Error("User with this email already exists", { cause: 409 });
      }

      const token = jwt.sign(
         { email },
         process.env.JWT_SECRET ?? "Top_Secret_Key_1234!!!",
         {
            expiresIn: "1d",
         },
      );

      const hashedPassword = await bcrypt.hash(
         password,
         process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
      );

      const createdDate = formatDateForDb(new Date());

      await createUser({
         email,
         hashedPassword,
         token,
         createdDate,
      });

      res.status(201).json({ message: "User created successfully", token });
   } catch (error) {
      next(error);
   }
};

export const loginController = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const user = await getUserByEmail(email);

      if (!user) {
         throw new Error("User not found", { cause: 404 });
      }

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

      if (!passwordMatch) {
         throw new Error("Invalid password", { cause: 401 });
      }

      const token = jwt.sign(
         { email },
         process.env.JWT_SECRET ?? "Top_Secret_Key_1234!!!",
         { expiresIn: "1d" },
      );

      const lastLoginDate = formatDateForDb(new Date());

      const updatedUser = {
         ...user,
         token,
         lastLoginDate,
      };

      await updateUser(updatedUser);

      res.status(200).json({
         message: "Login email sent successfully.",
         token,
      });
   } catch (error) {
      next(error);
   }
};

export const validateTokenController = async (req, res, next) => {
   try {
      const { token } = req.body;

      const { email } = jwt.verify(
         token,
         process.env.JWT_SECRET ?? "Top_Secret_Key_1234!!!",
      );

      const user = await getUserByEmail(email);

      if (!user || user.token !== token) {
         throw new Error("Invalid token", { cause: 401 });
      }

      res.status(200).json({ message: "Token is valid" });
   } catch (error) {
      next(error);
   }
};
