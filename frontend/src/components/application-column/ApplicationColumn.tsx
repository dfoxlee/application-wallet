import { useDroppable } from "@dnd-kit/core";
import ApplicationCard from "../application-card/ApplicationCard";
import Loading from "../loading/Loading";

import styles from "./ApplicationColumn.module.css";
import { useApplications } from "../../hooks/useApplications";
import { useMemo } from "react";
import { applicationEvents } from "../../constants/refCodes";

interface ApplicationColumnProps {
   columnName: string;
}

export default function ApplicationColumn({
   columnName,
}: ApplicationColumnProps) {
   // hooks
   const { setNodeRef } = useDroppable({
      id: columnName,
   });
   const { applications, isLoading } = useApplications();

   // memoized values
   const filteredApplications = useMemo(() => {
      const eventTypeNumber = applicationEvents.find(e => e.refCodeValue === columnName)?.refCodeNumber;

      if (eventTypeNumber === undefined) return [];

      const sortedApplicationEvents = applications.map((app) => ({
         ...app,
         events: app.events.sort(
            (a, b) =>
               new Date(b.eventDate).getTime() -
               new Date(a.eventDate).getTime(),
         ),
      }));

      return sortedApplicationEvents.filter(
         (app) => app.events[0]?.eventType === eventTypeNumber,
      );
   }, [applications, columnName]);

   return (
      <div className={styles.container} ref={setNodeRef}>
         <h2 className={styles.columnName}>{columnName}</h2>
         <div className={styles.separator}></div>
         <div className={styles.applicationsWrapper}>
            {isLoading ? (
               <Loading />
            ) : (
               filteredApplications.map((application) => (
                  <ApplicationCard
                     key={application.applicationNumber}
                     application={application}
                  />
               ))
            )}
         </div>
      </div>
   );
}
