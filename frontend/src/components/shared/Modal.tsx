import type { ReactNode } from "react";
import StandardBtn from "./StandardBtn";
import { FaTimes } from "react-icons/fa";

import styles from "./Modal.module.css";

export default function Modal({
   children,
   onClose,
}: {
   children: ReactNode;
   onClose?: () => void;
}) {
   // handlers
   const handleBackgroundClick = () => {
      if (onClose) {
         onClose();
      }
   };
   return (
      <div className={styles.container}>
         <button
            className={styles.clickBackground}
            onClick={handleBackgroundClick}
         ></button>
         <div className={styles.wrapper}>
            <StandardBtn LeftIcon={FaTimes} onClick={onClose} />
            {children}
         </div>
      </div>
   );
}
