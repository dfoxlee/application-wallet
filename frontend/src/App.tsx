import Applications from "./components/applications/Applications";
import Header from "./components/header/Header";
import AddApplicationModal from "./components/add-application-modal/AddApplicationModal";
import { Bounce, ToastContainer } from "react-toastify";
import { useModalStore } from "./stores/modalStores";
import ViewApplicationModal from "./components/view-application-modal/ViewApplicationModal";
import AuthModal from "./components/auth-modal/AuthModal";
import { useAuthCheck } from "./hooks/useAuthCheck";

import styles from "./App.module.css";

export default function App() {
   // hooks
   const { token } = useAuthCheck();

   // stores
   const modalTitle = useModalStore((state) => state.modalTitle);
   const viewApplicationNumber = useModalStore(
      (state) => state.viewApplicationNumber,
   );
   const authType = useModalStore((state) => state.authType);

   return (
      <div className={styles.container}>
         <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
         />
         <Header />
         <Applications />
         {modalTitle === "Add Application" && <AddApplicationModal />}
         {viewApplicationNumber !== null && <ViewApplicationModal />}
         {authType && <AuthModal />}
      </div>
   );
}
