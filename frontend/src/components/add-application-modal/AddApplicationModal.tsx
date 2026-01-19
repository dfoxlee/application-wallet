import StandardBtn from "../shared/StandardBtn";
import { useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import Modal from "../shared/Modal";
import { useModalStore } from "../../stores/modalStores";
import { useApplicationStore } from "../../stores/applicationStore";

import styles from "./AddApplicationModal.module.css";
import { fetchCreateApplication } from "../../services/applicationServices";
import { useAuthStore } from "../../stores/authStore";

export default function AddApplicationModal() {
   // stores
   const setModalTitle = useModalStore((state) => state.setModalTitle);
   const applications = useApplicationStore((state) => state.applications);
   const setApplications = useApplicationStore(
      (state) => state.setApplications,
   );
   const token = useAuthStore((state) => state.token);

   // states
   const [title, setTitle] = useState("");
   const [company, setCompany] = useState("");
   const [applicationDate, setApplicationDate] = useState(
      new Date().toISOString().split("T")[0],
   );
   const [description, setDescription] = useState("");

   // handlers
   const handleCloseClick = () => {
      setTitle("");
      setCompany("");
      setApplicationDate(new Date().toISOString().split("T")[0]);
      setDescription("");
      setModalTitle(null);
   };

   const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
   };

   const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCompany(e.target.value);
   };

   const handleApplicationDateChange = (e: ChangeEvent<HTMLInputElement>) => {
      setApplicationDate(e.target.value);
   };

   const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
   };

   const handleCancelClick = () => {
      setTitle("");
      setCompany("");
      setApplicationDate(new Date().toISOString().split("T")[0]);
      setDescription("");
      setModalTitle(null);
   };

   const handleAddApplicationClick = async () => {
      if (!title || !company || !applicationDate) {
         const missingFields = [];

         if (!title) missingFields.push("Title");
         if (!company) missingFields.push("Company");
         if (!applicationDate) missingFields.push("Application Date");

         toast.error(
            `Please fill in the following fields: ${missingFields.join(", ")}`,
         );

         return;
      }

      const newApplication = {
         applicationNumber: applications.length + 1,
         title,
         company,
         description,
         events: [
            {
               eventNumber: 1,
               eventType: 1,
               eventDate: applicationDate,
               notes: "",
            },
         ],
      };

      if (token) {
         try {
            await fetchCreateApplication(token, newApplication);
         } catch (error) {
            console.error(error);

            toast.error("An error occurred while adding the application. Please try again later.");

            return;
         }
      }
      
      setApplications([...applications, newApplication]);

      setTitle("");
      setCompany("");
      setApplicationDate(new Date().toISOString().split("T")[0]);
      setDescription("");
      setModalTitle(null);
   };

   return (
      <Modal onClose={handleCloseClick}>
         <h2 className={styles.title}>Add Application</h2>
         <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="title">
               Title
            </label>
            <input
               className={styles.input}
               type="text"
               id="title"
               placeholder="Enter job title"
               value={title}
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
               placeholder="Enter company name"
               value={company}
               onChange={handleCompanyChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="application-date">
               Application Date
            </label>
            <input
               className={styles.input}
               type="date"
               id="application-date"
               value={applicationDate}
               onChange={handleApplicationDateChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="description">
               Description
            </label>
            <textarea
               className={styles.textarea}
               id="description"
               placeholder="Enter job description (optional)"
               value={description}
               onChange={handleDescriptionChange}
            />
         </div>
         <div className={styles.footerWrapper}>
            <StandardBtn text="Cancel" outlined onClick={handleCancelClick} />
            <StandardBtn
               text="Add Application"
               filled
               onClick={handleAddApplicationClick}
            />
         </div>
      </Modal>
   );
}
