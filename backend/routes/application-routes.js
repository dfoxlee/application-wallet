import express from "express";
import {
   createApplicationController,
   getApplicationsController,
   updateApplicationController,
   deleteApplicationController,
} from "../controllers/application-controller.js";

const applicationRouter = express.Router();

applicationRouter.get("/", getApplicationsController);
applicationRouter.post("/", createApplicationController);
applicationRouter.patch("/", updateApplicationController);
applicationRouter.delete("/", deleteApplicationController);

export default applicationRouter;
