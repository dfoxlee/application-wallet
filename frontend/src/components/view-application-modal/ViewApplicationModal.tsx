import { use, useMemo, useState, type ChangeEvent } from "react";
import { useApplicationStore } from "../../stores/applicationStore";
import { useModalStore } from "../../stores/modalStores";
import Modal from "../shared/Modal";

import styles from "./ViewApplicationModal.module.css";
import { applicationEvents } from "../../constants/refCodes";
import StandardBtn from "../shared/StandardBtn";
import { FaPlus } from "react-icons/fa";

export default function ViewApplicationModal() {
   // stores
   const applications = useApplicationStore((state) => state.applications);
   const setApplications = useApplicationStore(
      (state) => state.setApplications,
   );
   const viewApplicationNumber = useModalStore(
      (state) => state.viewApplicationNumber,
   );
   const setViewApplicationNumber = useModalStore(
      (state) => state.setViewApplicationNumber,
   );

   // memoized values
   const viewApplication = useMemo(() => {
      return applications.find(
         (app) => app.applicationNumber === viewApplicationNumber,
      );
   }, [applications, viewApplicationNumber]);

   // handlers
   const handleClose = () => {
      setViewApplicationNumber(null);
   };

   const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!viewApplication) return;

      const updatedApplication = {
         ...viewApplication,
         title: e.target.value,
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      setApplications(updatedApplications);
   };

   const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!viewApplication) return;

      const updatedApplication = {
         ...viewApplication,
         company: e.target.value,
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      setApplications(updatedApplications);
   };

   const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!viewApplication) return;

      const updatedApplication = {
         ...viewApplication,
         description: e.target.value,
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      setApplications(updatedApplications);
   };

   const handleAddEventClick = () => {
      if (!viewApplication) return;

      const newEvent = {
         eventNumber:
            Math.max(
               0,
               ...viewApplication.events.map((event) => event.eventNumber),
            ) + 1,
         eventDate: new Date().toISOString().split("T")[0],
         eventType: 1,
         notes: "",
      };

      const updatedApplication = {
         ...viewApplication,
         events: [...viewApplication.events, newEvent],
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      setApplications(updatedApplications);
   };

   const handleEventDateChange = (eventNumber: number, newDate: string) => {
      if (!viewApplication) return;

      const updatedEvents = viewApplication.events.map((event) =>
         event.eventNumber === eventNumber
            ? { ...event, eventDate: newDate }
            : event,
      );

      const updatedApplication = {
         ...viewApplication,
         events: updatedEvents,
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      setApplications(updatedApplications);
   };

   const handleEventTypeChange = (eventNumber: number, newType: number) => {
      if (!viewApplication) return;

      const updatedEvents = viewApplication.events.map((event) =>
         event.eventNumber === eventNumber
            ? { ...event, eventType: newType }
            : event,
      );

      const updatedApplication = {
         ...viewApplication,
         events: updatedEvents,
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      setApplications(updatedApplications);
   };

   const handleEventNotesChange = (eventNumber: number, newNotes: string) => {
      if (!viewApplication) return;

      const updatedEvents = viewApplication.events.map((event) =>
         event.eventNumber === eventNumber
            ? { ...event, notes: newNotes }
            : event,
      );

      const updatedApplication = {
         ...viewApplication,
         events: updatedEvents,
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      setApplications(updatedApplications);
   };

   return (
      <Modal onClose={handleClose}>
         <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="title">
               Job Title
            </label>
            <input
               className={styles.input}
               type="text"
               id="title"
               value={viewApplication?.title}
               onChange={handleTitleChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="company">
               Company
            </label>
            <input
               className={styles.input}
               type="text"
               id="company"
               value={viewApplication?.company}
               onChange={handleCompanyChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="description">
               Description
            </label>
            <textarea
               className={styles.textarea}
               id="description"
               value={viewApplication?.description}
               onChange={handleDescriptionChange}
            />
         </div>
         <StandardBtn
            style={{ margin: "10px auto 0" }}
            LeftIcon={FaPlus}
            text="Event"
            outlined
            onClick={handleAddEventClick}
         />
         <table className={styles.table}>
            <thead>
               <tr>
                  <th className={styles.tableHeader}>Date</th>
                  <th className={styles.tableHeader}>Event</th>
                  <th className={styles.tableHeader}>Notes</th>
               </tr>
            </thead>
            <tbody>
               {viewApplication &&
                  viewApplication.events.map((event) => (
                     <tr key={event.eventNumber}>
                        <td className={styles.tableData}>
                           <input
                              type="date"
                              value={event.eventDate}
                              className={styles.tableDateInput}
                              onChange={(e) =>
                                 handleEventDateChange(
                                    event.eventNumber,
                                    e.target.value,
                                 )
                              }
                           />
                        </td>
                        <td className={styles.tableData}>
                           <select
                              name="event-type"
                              id="event-type"
                              className={styles.tableSelect}
                              onChange={(e) =>
                                 handleEventTypeChange(
                                    event.eventNumber,
                                    Number(e.target.value),
                                 )
                              }
                              value={event.eventType}
                           >
                              {applicationEvents.map((ae) => (
                                 <option
                                    key={ae.refCodeNumber}
                                    value={ae.refCodeNumber}
                                    selected={
                                       ae.refCodeNumber === event.eventType
                                    }
                                 >
                                    {ae.refCodeValue}
                                 </option>
                              ))}
                           </select>
                        </td>
                        <td className={styles.tableData}>
                           <input
                              className={styles.tableInput}
                              type="text"
                              value={event.notes}
                              onChange={(e) =>
                                 handleEventNotesChange(
                                    event.eventNumber,
                                    e.target.value,
                                 )
                              }
                           />
                        </td>
                     </tr>
                  ))}
            </tbody>
         </table>
      </Modal>
   );
}
