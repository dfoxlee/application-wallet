import { useApplications } from "../../hooks/useApplications";
import { applicationEvents } from "../../constants/refCodes";
import ApplicationColumn from "../application-column/ApplicationColumn";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import styles from "./Applications.module.css";
import { useAuthStore } from "../../stores/authStore";
import { toast } from "react-toastify";
import { fetchCreateEvent } from "../../services/eventServices";

export default function Applications() {
   // hooks
   const { applications, setApplications } = useApplications();
   const token = useAuthStore((state) => state.token);

   // handlers
   const handleDragEnd = async (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
         const activeApp = applications.find(
            (app) => app.applicationNumber === active.id,
         );

         const newEventType = applicationEvents.find(
            (e) => e.refCodeValue === over.id,
         );

         if (newEventType === undefined || activeApp === undefined) return;

         let newEvent = {
            eventNumber: activeApp?.events ? activeApp?.events.length + 1 : 1,
            applicationNumber: activeApp.applicationNumber,
            eventType: newEventType.refCodeNumber,
            eventDate: new Date().toISOString(),
            notes: "",
         };

         if (token) {
            try {
               const response = await fetchCreateEvent(token, newEvent);

               newEvent = response.event;
            } catch (error) {
               console.error(error);

               toast.error(
                  "There was an issue updating the application event. Please try again.",
               );

               return;
            }
         }

         const updatedApplication = {
            ...activeApp,
            events: activeApp ? [newEvent, ...activeApp.events] : [newEvent],
         };

         const updatedApplications = applications.map((app) =>
            app.applicationNumber === active.id ? updatedApplication : app,
         );

         setApplications(updatedApplications);
      }
   };

   return (
      <div className={styles.container}>
         {!token && (
            <p className={styles.authMessage}>
               Login or Sign-Up To Save Your Applications Remotely.
            </p>
         )}
         {applications.length ? (
            <div className={styles.applicationsGridWrapper}>
               <DndContext onDragEnd={handleDragEnd}>
                  {applicationEvents.map((e) => (
                     <ApplicationColumn
                        key={e.refCodeValue}
                        columnName={e.refCodeValue}
                     />
                  ))}
               </DndContext>
            </div>
         ) : (
            <p className={styles.noApplicationsMessage}>
               Create an application to get started.
            </p>
         )}
      </div>
   );
}
