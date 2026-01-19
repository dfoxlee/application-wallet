import Modal from "../shared/Modal";
import { useModalStore } from "../../stores/modalStores";
import StandardBtn from "../shared/StandardBtn";

import styles from "./AuthModal.module.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { fetchLogin, fetchSignup } from "../../services/authServices";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/authStore";

export default function AuthModal() {
   // states
   const [emailInput, setEmailInput] = useState("");
   const [passwordInput, setPasswordInput] = useState("");
   const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

   // stores
   const authType = useModalStore((state) => state.authType);
   const setAuthType = useModalStore((state) => state.setAuthType);
   const setToken = useAuthStore((state) => state.setToken);

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

   const handleAuthSubmit = async (e: FormEvent) => {
      e.preventDefault();

      try {
         if (authType === "login") {
            const response = await fetchLogin({
               email: emailInput,
               password: passwordInput,
            });

            localStorage.setItem("application-wallet", response.token);
            setToken(response.token);

            toast.success("Logged in successfully!");

            setAuthType(null);
         } else if (authType === "signup") {
            if (passwordInput !== confirmPasswordInput) {
               toast.error("Passwords do not match.");

               return;
            }
            const response = await fetchSignup({
               email: emailInput,
               password: passwordInput,
            });

            localStorage.setItem("application-wallet", response.token);
            setToken(response.token);

            toast.success("Account created successfully!");

            setAuthType(null);
         }
      } catch (error) {
         console.error(error);

         toast.error(
            `An error occurred ${authType === "login" ? "logging in" : "signing up"}. Please try again later.`,
         );
      }
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
                  Email Address
               </label>
               <input
                  className={styles.input}
                  type="text"
                  id="email"
                  value={emailInput}
                  onChange={handleEmailInputChange}
               />
            </div>
            <div className={styles.inputWrapper}>
               <label className={styles.label} htmlFor="password">
                  Password
               </label>
               <input
                  className={styles.input}
                  type="password"
                  id="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
               />
            </div>
            {authType === "signup" && (
               <div className={styles.inputWrapper}>
                  <label className={styles.label} htmlFor="confirm-password">
                     Confirm Password
                  </label>
                  <input
                     className={styles.input}
                     type="password"
                     id="confirm-password"
                     value={confirmPasswordInput}
                     onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  />
               </div>
            )}
            <StandardBtn
               style={{
                  margin: "20px auto 0",
               }}
               type="submit"
               text={authType === "login" ? "Login" : "Sign Up"}
               filled={true}
            />
         </form>
      </Modal>
   );
}
