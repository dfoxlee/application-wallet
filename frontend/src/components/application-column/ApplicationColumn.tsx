import { useDroppable } from "@dnd-kit/core";
import type { ApplicationType } from "../../types/applicationTypes";
import ApplicationCard from "../application-card/ApplicationCard";
import Loading from "../loading/Loading";

import styles from "./ApplicationColumn.module.css";

interface ApplicationColumnProps {
   columnName: string;
   applications: ApplicationType[];
   isLoading: boolean;
}

export default function ApplicationColumn({
   columnName,
   applications,
   isLoading,
}: ApplicationColumnProps) {
   // hooks
   const { setNodeRef } = useDroppable({
      id: columnName,
   });

   return (
      <div className={styles.container} ref={setNodeRef}>
         <h2 className={styles.columnName}>{columnName}</h2>
         <div className={styles.separator}></div>
         <div className={styles.applicationsWrapper}>
            {isLoading ? (
               <Loading />
            ) : (
               applications.map((application) => (
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
