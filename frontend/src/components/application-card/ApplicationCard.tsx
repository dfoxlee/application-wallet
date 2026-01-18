import type { ApplicationType } from "../../types/applicationTypes";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { FaArrowsAlt, FaGlasses, FaTrash } from "react-icons/fa";
import StandardBtn from "../shared/StandardBtn";
import { useModalStore } from "../../stores/modalStores";
import { useApplicationStore } from "../../stores/applicationStore";

import styles from "./ApplicationCard.module.css";

interface ApplicationCardProps {
   application: ApplicationType;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
   // hooks
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: application.applicationNumber,
   });

   // stores
   const applications = useApplicationStore((state) => state.applications);
   const setApplications = useApplicationStore(
      (state) => state.setApplications,
   );
   const setViewApplicationNumber = useModalStore(
      (state) => state.setViewApplicationNumber,
   );

   // handlers
   const handleViewApplicationClick = () => {
      setViewApplicationNumber(application.applicationNumber);
   };

   const handleDeleteApplicationClick = () => {
      const updatedApplications = applications.filter(
         (app) => app.applicationNumber !== application.applicationNumber,
      );

      setApplications(updatedApplications);
   };

   const style = {
      transform: CSS.Translate.toString(transform),
   };

   return (
      <div className={styles.container} ref={setNodeRef} style={style}>
         <div {...listeners} {...attributes} className={styles.header}>
            <FaArrowsAlt className={styles.dragIcon} />
            <h3 className={styles.title}>{application.title}</h3>
         </div>
         <h4 className={styles.company} {...listeners} {...attributes}>{application.company}</h4>
         <div className={styles.btnsWrapper}>
            <StandardBtn
               LeftIcon={FaGlasses}
               theme="info"
               onClick={handleViewApplicationClick}
            />
            <StandardBtn
               LeftIcon={FaTrash}
               theme="warning"
               onClick={handleDeleteApplicationClick}
            />
         </div>
      </div>
   );
}
