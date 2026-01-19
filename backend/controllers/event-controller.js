import {
   createEvent,
   updateEvent,
   deleteEvent,
} from "../services/event-services.js";

export const createEventController = async (req, res, next) => {
   try {
      const { event } = req.body;

      const newEventId = await createEvent({
         ...event,
      });

      res.status(201).json({ event: { ...event, eventNumber: newEventId } });
   } catch (error) {
      next(error);
   }
};

export const updateEventController = async (req, res, next) => {
   try {
      const { event } = req.body;

      await updateEvent({
         ...event,
      });

      res.status(200).json({ message: "Event updated successfully" });
   } catch (error) {
      next(error);
   }
};

export const deleteEventController = async (req, res, next) => {
   try {
      const { eventNumber } = req.body;

      await deleteEvent(eventNumber);

      res.status(200).json({ message: "Event deleted successfully" });
   } catch (error) {
      next(error);
   }
};
