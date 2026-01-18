import { useMemo } from "react";
import { useApplications } from "../../hooks/useApplications";
import { applicationEvents } from "../../constants/refCodes";
import ApplicationColumn from "../application-column/ApplicationColumn";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import styles from "./Applications.module.css";

export default function Applications() {
   // hooks
   const { applications, setApplications, isApplicationsLoading } =
      useApplications();

   // memoized values
   const columns = useMemo(() => {
      const sortedApplicationEvents = applications.map((app) => ({
         ...app,
         events: app.events.sort(
            (a, b) =>
               new Date(b.eventDate).getTime() -
               new Date(a.eventDate).getTime(),
         ),
      }));

      return applicationEvents.map((event) => ({
         columnName: event.refCodeValue,
         applications: sortedApplicationEvents.filter(
            (app) => app.events[0]?.eventType === event.refCodeNumber,
         ),
      }));
   }, [applications]);

   // handlers
   const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
         const activeApp = applications.find(
            (app) => app.applicationNumber === active.id,
         );

         const newEventType = applicationEvents.find(
            (e) => e.refCodeValue === over.id,
         );

         if (newEventType === undefined || activeApp === undefined) return;

         const newEvent = {
            eventNumber: activeApp?.events ? activeApp?.events.length + 1 : 1,
            eventType: newEventType.refCodeNumber,
            eventDate: new Date().toISOString(),
            notes: "",
         };

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
         <DndContext onDragEnd={handleDragEnd}>
            {columns.map((column) => (
               <ApplicationColumn
                  key={column.columnName}
                  columnName={column.columnName}
                  applications={column.applications}
                  isLoading={isApplicationsLoading}
               />
            ))}
         </DndContext>
      </div>
   );
}
