import jwt from "jsonwebtoken";
import {
   getUserByEmail,
   createUser,
   updateUser,
} from "../services/auth-services.js";
import { formatDateForDb } from "../utils/formatters.js";
import transporter from "../utils/emailer.js";
import logger from "../utils/logger.js";

export const signupController = async (req, res, next) => {
   try {
      const { email } = req.body;

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
         throw new Error("User with this email already exists", { cause: 409 });
      }

      const confirmationToken = jwt.sign(
         { email },
         process.env.JWT_SECRET ?? "Top_Secret_Key_1234!!!",
         {
            expiresIn: "1d",
         },
      );

      const createdDate = formatDateForDb(new Date());

      await createUser({
         email,
         confirmationToken,
         createdDate,
      });

      const info = await transporter.sendMail({
         from: '"Application Wallet" <application.wallet@gmail.com>',
         to: email,
         subject: "Confirm your email for Application Wallet",
         text: `Click the link to confirm your email: http://localhost:3000/confirm?token=${confirmationToken}`,
         html: `<p>Click the link to confirm your email: <a href="http://localhost:3000/confirm?token=${confirmationToken}">Confirm Email</a></p>`,
      });

      logger.info("Message sent: %s", info.messageId);

      res.status(201).json({ message: "User created successfully" });
   } catch (error) {
      next(error);
   }
};

export const loginController = async (req, res, next) => {
   try {
      const { email } = req.body;

      const user = await getUserByEmail(email);

      if (!user) {
         throw new Error("User not found", { cause: 404 });
      }
      const token = jwt.sign(
         { email },
         process.env.JWT_SECRET ?? "Top_Secret_Key_1234!!!",
         { expiresIn: "1d" },
      );

      const updatedUser = {
         ...user,
         token,
      };

      await updateUser(updatedUser);

      const info = await transporter.sendMail({
         from: '"Application Wallet" <application.wallet@gmail.com>',
         to: email,
         subject: "Login to Application Wallet",
         text: `Click the link to login: http://localhost:3000/login?token=${token}`,
         html: `<p>Click the link to login: <a href="http://localhost:3000/login?token=${token}">Login</a></p>`,
      });

      logger.info("Message sent: %s", info.messageId);

      res.status(200).json({ message: "Login email sent successfully." });
   } catch (error) {
      next(error);
   }
};

export const confirmEmailController = async (req, res, next) => {
   try {
      const { confirmationToken } = req.query;

      const email = jwt.verify(
         confirmationToken,
         process.env.JWT_SECRET ?? "Top_Secret_Key_1234!!!",
      );

      const user = await getUserByEmail(email);

      if (!user) {
         throw new Error("Invalid token or user does not exist", {
            cause: 400,
         });
      }

      const confirmationDate = formatDateForDb(new Date());

      const token = jwt.sign(
         { email },
         process.env.JWT_SECRET ?? "Top_Secret_Key_1234!!!",
         { expiresIn: "7d" },
      );

      const updatedUser = {
         ...user,
         confirmationToken: null,
         confirmationDate,
         token,
      };

      await updateUser(updatedUser);

      res.status(200).json({ message: "Email confirmed successfully.", token });
   } catch (error) {
      next(error);
   }
};

export const validateTokenController = async (req, res, next) => {
   try {
      const { token } = req.body;

      const email = jwt.verify(
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
