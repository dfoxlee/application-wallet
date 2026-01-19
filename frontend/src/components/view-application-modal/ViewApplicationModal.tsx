import { useMemo, useState, type ChangeEvent } from "react";
import { useApplicationStore } from "../../stores/applicationStore";
import { useModalStore } from "../../stores/modalStores";
import Modal from "../shared/Modal";
import StandardBtn from "../shared/StandardBtn";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/authStore";
import { fetchUpdateApplication } from "../../services/applicationServices";
import { formatDateForDb } from "../../utils/formatting";
import EventsTable from "./components/EventsTable";
import { fetchCreateEvent } from "../../services/eventServices";

import styles from "./ViewApplicationModal.module.css";

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
   const token = useAuthStore((state) => state.token);

   // memoized values
   const viewApplication = useMemo(() => {
      return applications.find(
         (app) => app.applicationNumber === viewApplicationNumber,
      );
   }, [applications, viewApplicationNumber]);

   // states
   const [titleInput, setTitleInput] = useState(viewApplication?.title || "");
   const [companyInput, setCompanyInput] = useState(
      viewApplication?.company || "",
   );
   const [descriptionInput, setDescriptionInput] = useState(
      viewApplication?.description || "",
   );

   // handlers
   const handleClose = () => {
      setViewApplicationNumber(null);
   };

   const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitleInput(e.target.value);
   };

   const handleTitleBlur = async () => {
      if (!viewApplication) return;

      if (viewApplication.title === titleInput) return;

      const updatedApplication = {
         ...viewApplication,
         title: titleInput,
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      if (token) {
         try {
            await fetchUpdateApplication(token, updatedApplication);
         } catch (error) {
            console.error(error);

            toast.error("Failed to update title. Please try again later.");

            return;
         }
      }

      setApplications(updatedApplications);
   };

   const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCompanyInput(e.target.value);
   };

   const handleCompanyBlur = async () => {
      if (!viewApplication) return;

      if (viewApplication.company === companyInput) return;

      const updatedApplication = {
         ...viewApplication,
         company: companyInput,
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      if (token) {
         try {
            await fetchUpdateApplication(token, updatedApplication);
         } catch (error) {
            console.error(error);

            toast.error("Failed to update company. Please try again later.");

            return;
         }
      }

      setApplications(updatedApplications);
   };

   const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescriptionInput(e.target.value);
   };

   const handleDescriptionBlur = async () => {
      if (!viewApplication) return;

      if (viewApplication.description === descriptionInput) return;

      const updatedApplication = {
         ...viewApplication,
         description: descriptionInput,
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      if (token) {
         try {
            await fetchUpdateApplication(token, updatedApplication);
         } catch (error) {
            console.error(error);

            toast.error(
               "Failed to update description. Please try again later.",
            );

            return;
         }
      }

      setApplications(updatedApplications);
   };

   const handleAddEventClick = async () => {
      if (!viewApplication) return;

      let newEvent = {
         applicationNumber: viewApplication.applicationNumber,
         eventNumber:
            Math.max(
               0,
               ...viewApplication.events.map((event) => event.eventNumber),
            ) + 1,
         eventDate: formatDateForDb(new Date()),
         eventType: 1,
         notes: "",
      };

      if (token) {
         try {
            const response = await fetchCreateEvent(token, newEvent);

            newEvent = response.event;
         } catch (error) {
            console.error(error);

            toast.error("Failed to add event. Please try again later.");

            return;
         }
      }

      const updatedApplication = {
         ...viewApplication,
         events: [...viewApplication.events, newEvent],
      };

      const updatedApplications = applications.map((app) =>
         app.applicationNumber === updatedApplication.applicationNumber
            ? updatedApplication
            : app,
      );

      if (token) {
         try {
            await fetchUpdateApplication(token, updatedApplication);
         } catch (error) {
            console.error(error);

            toast.error("Failed to add event. Please try again later.");

            return;
         }
      }

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
               value={titleInput}
               onChange={handleTitleChange}
               onBlur={handleTitleBlur}
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
               value={companyInput}
               onChange={handleCompanyChange}
               onBlur={handleCompanyBlur}
            />
         </div>
         <div className={styles.textareaWrapper}>
            <label className={styles.label} htmlFor="description">
               Description
            </label>
            <textarea
               className={styles.textarea}
               id="description"
               value={descriptionInput}
               onChange={handleDescriptionChange}
               onBlur={handleDescriptionBlur}
            />
         </div>
         <StandardBtn
            style={{ margin: "10px auto 0" }}
            LeftIcon={FaPlus}
            text="Event"
            outlined
            onClick={handleAddEventClick}
         />
         {viewApplication && <EventsTable events={viewApplication.events} />}
      </Modal>
   );
}
