import { useState, type ReactNode } from "react";
import StandardBtn from "./StandardBtn";
import { FaTimes, FaWindowMaximize, FaWindowMinimize } from "react-icons/fa";

import styles from "./Modal.module.css";

export default function Modal({
   children,
   onClose,
}: {
   children: ReactNode;
   onClose?: () => void;
}) {
   // states
   const [fillScreen, setFillScreen] = useState(false);

   // handlers
   const handleBackgroundClick = () => {
      if (onClose) {
         onClose();
      }
   };

   const toggleFillScreen = () => {
      setFillScreen((prev) => !prev);
   };

   return (
      <div className={styles.container}>
         <button
            className={styles.clickBackground}
            onClick={handleBackgroundClick}
         ></button>
         <div
            className={fillScreen ? styles.wrapperFillScreen : styles.wrapper}
         >
            <header className={styles.headerWrapper}>
               <StandardBtn LeftIcon={FaTimes} onClick={onClose} />
               <StandardBtn
                  LeftIcon={fillScreen ? FaWindowMinimize : FaWindowMaximize}
                  onClick={toggleFillScreen}
               />
            </header>
            {children}
         </div>
      </div>
   );
}
