import express from "express";
import {
   createEventController,
   updateEventController,
   deleteEventController,
} from "../controllers/event-controller.js";

const eventRouter = express.Router();

eventRouter.post("/", createEventController);
eventRouter.patch("/", updateEventController);
eventRouter.delete("/", deleteEventController);

export default eventRouter;
