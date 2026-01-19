import {
   getApplicationsByUserNumber,
   createApplication,
   updateApplication,
   deleteApplication,
} from "../services/application-services.js";
import {
   getEventsByApplicationNumber,
   createEvent,
   updateEvent,
   deleteEvent,
} from "../services/event-services.js";
import consoleLogger from "../utils/console-logger.js";

export const getApplicationsController = async (req, res, next) => {
   try {
      const { user } = req;

      const applications = await getApplicationsByUserNumber(user.userNumber);

      const applicationsWithEvents = await Promise.all(
         applications.map(async (application) => {
            const events = await getEventsByApplicationNumber(
               application.applicationNumber,
            );
            return {
               ...application,
               events,
            };
         }),
      );

      res.status(200).json({ applications: applicationsWithEvents });
   } catch (error) {
      next(error);
   }
};

export const createApplicationController = async (req, res, next) => {
   try {
      const { user } = req;
      const { newApplication } = req.body;

      const newApplicationId = await createApplication({
         ...newApplication,
         userNumber: user.userNumber,
      });

      const { events } = newApplication;

      if (events && events.length > 0) {
         for (const event of events) {
            await createEvent({
               ...event,
               applicationNumber: newApplicationId,
            });
         }
      }

      res.status(201).json({ message: "Application created successfully˝" });
   } catch (error) {
      next(error);
   }
};

export const updateApplicationController = async (req, res, next) => {
   try {
      const { updatedApplication } = req.body;
      const { user } = req;

      await updateApplication({
         ...updatedApplication,
         userNumber: user.userNumber,
      });

      const { events } = updatedApplication;

      if (events && events.length > 0) {
         const currentEvents = await getEventsByApplicationNumber(
            updatedApplication.applicationNumber,
         );

         const currentEventIds = currentEvents.map((event) => event.eventId);
         const updatedEventIds = events
            .map((event) => event.eventId)
            .filter((id) => id !== undefined);

         // Delete events that are not in the updated list
         for (const currentEvent of currentEvents) {
            if (!updatedEventIds.includes(currentEvent.eventId)) {
               await deleteEvent(currentEvent.eventId);
            }
         }

         // Create or update events
         for (const event of events) {
            if (event.eventId && currentEventIds.includes(event.eventId)) {
               await updateEvent(event);
            } else {
               await createEvent({
                  ...event,
                  applicationNumber: updatedApplication.applicationNumber,
               });
            }
         }
      }

      res.status(200).json({ message: "Application updated successfully" });
   } catch (error) {
      next(error);
   }
};

export const deleteApplicationController = async (req, res, next) => {
   try {
      const { applicationNumber } = req.body;

      await deleteApplication(applicationNumber);

      res.status(200).json({ message: "Application deleted successfully" });
   } catch (error) {
      next(error);
   }
};
