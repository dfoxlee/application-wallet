import express from "express";
import {
   signupController,
   loginController,
   validateTokenController,
} from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/validate-token", validateTokenController);

export default authRouter;
