import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { fetchValidateToken } from "../services/authServices";
import { toast } from "react-toastify";

export const useAuthCheck = () => {
   // stores
   const token = useAuthStore((state) => state.token);
   const setToken = useAuthStore((state) => state.setToken);

   // effect functions
   const validateToken = async (token: string) => {
      try {
         await fetchValidateToken(token);

         setToken(token);
      } catch (error) {
         console.error(error);

         localStorage.removeItem("application-wallet");
         setToken(null);

         toast.error("Session expired. Please log in again.");
      }
   };

   // effects
   useEffect(() => {
      const localAuthToken = localStorage.getItem("application-wallet");

      if (localAuthToken) {
         validateToken(localAuthToken);
      }
   }, []);

   return { token };
};
