import { toast } from "react-toastify";
import { useApplicationStore } from "../stores/applicationStore";
// import { APPLICATIONS } from "../constants/dummyData";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { fetchApplications } from "../services/applicationServices";

export const useApplications = () => {
   // stores
   const { applications, setApplications } = useApplicationStore();
   const token = useAuthStore((state) => state.token);

   // states
   const [isLoading, setIsLoading] = useState(false);

   // effect functions
   const getApplications = async () => {
      try {
         setIsLoading(true);

         // simulate API call for testing
         // await new Promise((resolve) => setTimeout(resolve, 2000));
         // setApplications(APPLICATIONS);

         if (!token) {
            return;
         }

         const response = await fetchApplications(token);

         setApplications(response.applications);
      } catch (error) {
         console.error(error);

         toast.error("Failed to fetch applications");
      } finally {
         setIsLoading(false);
      }
   };

   // effects
   useEffect(() => {
      getApplications();
   }, [token]);

   return {
      applications,
      setApplications,
      getApplications,
      isLoading,
   };
};
