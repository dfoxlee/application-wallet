import { FaPlus } from "react-icons/fa";
import StandardBtn from "../shared/StandardBtn";
import { useModalStore } from "../../stores/modalStores";

import styles from "./Header.module.css";
import { useAuthStore } from "../../stores/authStore";
import { useApplicationStore } from "../../stores/applicationStore";
import { APPLICATIONS } from "../../constants/dummyData";

export default function Header() {
   // stores
   const setModalTitle = useModalStore((state) => state.setModalTitle);
   const setAuthType = useModalStore((state) => state.setAuthType);
   const token = useAuthStore((state) => state.token);
   const setToken = useAuthStore((state) => state.setToken);
   const applications = useApplicationStore((state) => state.applications);
   const setApplications = useApplicationStore(
      (state) => state.setApplications,
   );

   // handlers
   const handleAddApplicationClick = () => {
      setModalTitle("Add Application");
   };

   const handleAuthClick = () => {
      // logout user
      if (token) {
         setToken(null);
         localStorage.removeItem("application-wallet");
         setApplications([]);
         return;
      }

      setAuthType("login");
   };

   const handlePopulateDemoDataClick = () => {
      setApplications(APPLICATIONS);
   };

   const handleClearApplicationsClick = () => {
      setApplications([]);
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
               {!token && !applications.length && (
                  <StandardBtn
                     text="Populate Demo Data"
                     onClick={handlePopulateDemoDataClick}
                     outlined
                     theme="info"
                  />
               )}
               {!token && applications.length > 0 && (
                  <StandardBtn
                     text="Clear Applications"
                     onClick={handleClearApplicationsClick}
                     outlined
                     theme="warning"
                  />
               )}
               <StandardBtn
                  text={token ? "Logout" : "Login or Sign Up"}
                  outlined
                  onClick={handleAuthClick}
               />
            </div>
         </div>
      </div>
   );
}
