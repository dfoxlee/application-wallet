import { FaPlus } from "react-icons/fa";
import StandardBtn from "../shared/StandardBtn";
import { useModalStore } from "../../stores/modalStores";

import styles from "./Header.module.css";

export default function Header() {
   // stores
   const setModalTitle = useModalStore((state) => state.setModalTitle);
   const setAuthType = useModalStore((state) => state.setAuthType);

   // handlers
   const handleAddApplicationClick = () => {
      setModalTitle("Add Application");
   };

   const handleAuthClick = () => {
      setAuthType("login");
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h1>Application Wallet</h1>
            <div className={styles.btnsWrapper}>
               <StandardBtn
                  LeftIcon={FaPlus}
                  text="Application"
                  filled
                  onClick={handleAddApplicationClick}
               />
               <StandardBtn
                  text="Login or Sign Up"
                  outlined
                  onClick={handleAuthClick}
               />
            </div>
         </div>
      </div>
   );
}
