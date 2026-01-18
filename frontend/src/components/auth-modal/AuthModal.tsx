import Modal from "../shared/Modal";
import { useModalStore } from "../../stores/modalStores";
import StandardBtn from "../shared/StandardBtn";

import styles from "./AuthModal.module.css";
import { useState, type ChangeEvent, type FormEvent } from "react";

export default function AuthModal() {
   // states
   const [emailInput, setEmailInput] = useState("");

   // stores
   const authType = useModalStore((state) => state.authType);
   const setAuthType = useModalStore((state) => state.setAuthType);

   // handlers
   const closeAuthModal = () => {
      setAuthType(null);
   };

   const handleSignUpClick = () => {
      setAuthType("signup");
   };

   const handleLoginClick = () => {
      setAuthType("login");
   };

   const handleAuthSubmit = (e: FormEvent) => {
      e.preventDefault();

      console.log("submit auth form");
   };

   const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEmailInput(e.target.value);
   };

   return (
      <Modal onClose={closeAuthModal}>
         <div className={styles.authTypeBtnsWrapper}>
            <StandardBtn
               text="Login"
               filled={authType === "login"}
               onClick={handleLoginClick}
            />
            <StandardBtn
               text="Sign Up"
               filled={authType === "signup"}
               onClick={handleSignUpClick}
            />
         </div>
         <form className={styles.formWrapper} onSubmit={handleAuthSubmit}>
            <div className={styles.inputWrapper}>
               <label className={styles.label} htmlFor="email">
                  {authType === "login"
                     ? "Enter email to be sent a link."
                     : "Enter email to create an account."}
               </label>
               <input
                  className={styles.input}
                  type="text"
                  id="email"
                  value={emailInput}
                  onChange={handleEmailInputChange}
               />
            </div>
            <StandardBtn
               style={{
                  margin: "30px auto 0",
               }}
               type="submit"
               text={
                  authType === "login" ? "Send Login Link" : "Create Account"
               }
               outlined={true}
            />
         </form>
      </Modal>
   );
}
