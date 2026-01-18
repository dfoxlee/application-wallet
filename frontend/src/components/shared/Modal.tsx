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
   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardBtn LeftIcon={FaTimes} onClick={onClose} />
            {children}
         </div>
      </div>
   );
}
