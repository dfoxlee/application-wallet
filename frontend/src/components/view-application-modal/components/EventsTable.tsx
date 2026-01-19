import type { EventType } from "../../../types/applicationTypes";
import EventRow from "./EventRow";

import styles from "./EventsTable.module.css";

interface EventsTableProps {
   events: EventType[];
}

export default function EventsTable({ events }: EventsTableProps) {
   return (
      <table className={styles.table}>
         <thead>
            <tr>
               <th className={styles.tableHeader}>Date</th>
               <th className={styles.tableHeader}>Event</th>
               <th className={styles.tableHeader}>Notes</th>
               <th className={styles.tableHeader}>Options</th>
            </tr>
         </thead>
         <tbody>
            {events.map((event) => (
               <EventRow key={event.eventNumber} event={event} />
            ))}
         </tbody>
      </table>
   );
}
