import { useState, type ChangeEvent } from "react";
import type { EventType } from "../../../types/applicationTypes";
import { applicationEvents } from "../../../constants/refCodes";
import StandardBtn from "../../shared/StandardBtn";
import { FaTrash } from "react-icons/fa";
import { useAuthStore } from "../../../stores/authStore";
import { useApplicationStore } from "../../../stores/applicationStore";
import { toast } from "react-toastify";
import {
   fetchDeleteEvent,
   fetchUpdateEvent,
} from "../../../services/eventServices";

import styles from "./EventRow.module.css";

export default function EventRow({ event }: { event: EventType }) {
   // stores
   const token = useAuthStore((state) => state.token);
   const applications = useApplicationStore((state) => state.applications);
   const setApplications = useApplicationStore(
      (state) => state.setApplications,
   );

   // states
   const [eventDateInput, setEventDateInput] = useState(event.eventDate);
   const [eventTypeInput, setEventTypeInput] = useState(event.eventType);
   const [eventNotesInput, setEventNotesInput] = useState(event.notes);

   // handlers
   const handleEventDateChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEventDateInput(e.target.value);
   };

   const handleEventDateBlur = async () => {
      if (eventDateInput === event.eventDate) return;

      const updatedEvent = {
         ...event,
         eventDate: eventDateInput,
      };

      if (token) {
         try {
            await fetchUpdateEvent(token, updatedEvent);
         } catch (error) {
            console.error(error);

            toast.error(
               "An error occurred saving the event date. Please try again later.",
            );

            return;
         }
      }

      const updatedApplications = applications.map((application) => {
         if (application.applicationNumber === event.applicationNumber) {
            const updatedEvents = application.events.map((appEvent) => {
               if (appEvent.eventNumber === event.eventNumber) {
                  return updatedEvent;
               }

               return appEvent;
            });

            return {
               ...application,
               events: updatedEvents,
            };
         }

         return application;
      });

      setApplications(updatedApplications);
   };

   const handleEventTypeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
      setEventTypeInput(Number(e.target.value));

      const updatedEvent = {
         ...event,
         eventType: Number(e.target.value),
      };

      if (token) {
         try {
            await fetchUpdateEvent(token, updatedEvent);
         } catch (error) {
            console.error(error);

            toast.error(
               "An error occurred saving the event type. Please try again later.",
            );

            return;
         }
      }

      const updatedApplications = applications.map((application) => {
         if (application.applicationNumber === event.applicationNumber) {
            const updatedEvents = application.events.map((appEvent) => {
               if (appEvent.eventNumber === event.eventNumber) {
                  return updatedEvent;
               }

               return appEvent;
            });

            return {
               ...application,
               events: updatedEvents,
            };
         }

         return application;
      });

      setApplications(updatedApplications);
   };

   const handleEventNotesChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEventNotesInput(e.target.value);
   };

   const handleEventNotesBlur = async () => {
      if (eventNotesInput === event.notes) return;

      const updatedEvent = {
         ...event,
         notes: eventNotesInput,
      };

      if (token) {
         try {
            await fetchUpdateEvent(token, updatedEvent);
         } catch (error) {
            console.error(error);

            toast.error(
               "An error occurred saving the event notes. Please try again later.",
            );

            return;
         }
      }

      const updatedApplications = applications.map((application) => {
         if (application.applicationNumber === event.applicationNumber) {
            const updatedEvents = application.events.map((appEvent) => {
               if (appEvent.eventNumber === event.eventNumber) {
                  return updatedEvent;
               }

               return appEvent;
            });

            return {
               ...application,
               events: updatedEvents,
            };
         }

         return application;
      });

      setApplications(updatedApplications);
   };

   const handleDeleteEventClick = async () => {
      if (token) {
         try {
            await fetchDeleteEvent(token, event.eventNumber);
         } catch (error) {
            console.error(error);

            toast.error(
               "An error occurred deleting the event. Please try again later.",
            );

            return;
         }
      }
      
      const updatedApplications = applications.map((application) => {
         if (application.applicationNumber === event.applicationNumber) {
            const updatedEvents = application.events.filter(
               (appEvent) => appEvent.eventNumber !== event.eventNumber,
            );

            return {
               ...application,
               events: updatedEvents,
            };
         }

         return application;
      });

      setApplications(updatedApplications);
   };

   return (
      <tr key={event.eventNumber}>
         <td className={styles.tableData}>
            <input
               type="date"
               value={eventDateInput}
               className={styles.tableDateInput}
               onChange={handleEventDateChange}
               onBlur={handleEventDateBlur}
            />
         </td>
         <td className={styles.tableData}>
            <select
               name="event-type"
               id="event-type"
               className={styles.tableSelect}
               onChange={handleEventTypeChange}
               value={eventTypeInput}
            >
               {applicationEvents.map((ae) => (
                  <option key={ae.refCodeNumber} value={ae.refCodeNumber}>
                     {ae.refCodeValue}
                  </option>
               ))}
            </select>
         </td>
         <td className={styles.tableData}>
            <input
               className={styles.tableInput}
               type="text"
               value={eventNotesInput}
               onChange={handleEventNotesChange}
               onBlur={handleEventNotesBlur}
            />
         </td>
         <td className={styles.tableData}>
            <StandardBtn
               LeftIcon={FaTrash}
               theme="warning"
               onClick={handleDeleteEventClick}
            />
         </td>
      </tr>
   );
}
