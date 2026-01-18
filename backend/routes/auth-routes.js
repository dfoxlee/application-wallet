import express from "express";
import { signupController, loginController, confirmEmailController, validateTokenController } from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.get("/confirm/:confirmationToken", confirmEmailController);
authRouter.post("/validate-token", validateTokenController);

export default authRouter;