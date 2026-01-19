import { toast } from "react-toastify";
import { useApplicationStore } from "../stores/applicationStore";
// import { APPLICATIONS } from "../constants/dummyData";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { fetchApplications } from "../services/applicationServices";

export const useApplications = () => {
   // stores
   const {
      applications,
      isApplicationsLoading,
      setApplications,
      setIsApplicationsLoading,
   } = useApplicationStore();
   const token = useAuthStore((state) => state.token);

   // effect functions
   const getApplications = async () => {
      try {
         setIsApplicationsLoading(true);

         // simulate API call
         // await new Promise((resolve) => setTimeout(resolve, 2000));
         // setApplications(APPLICATIONS);

         if (!token) {
            return setApplications([]);
         }

         const response = await fetchApplications(token);

         setApplications(response.applications);
      } catch (error) {
         console.error(error);

         toast.error("Failed to fetch applications");
      } finally {
         setIsApplicationsLoading(false);
      }
   };

   // effects
   useEffect(() => {
      getApplications();
   }, [token]);

   return {
      applications,
      isApplicationsLoading,
      setApplications,
      getApplications,
   };
};
