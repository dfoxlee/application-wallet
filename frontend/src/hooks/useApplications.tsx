import { toast } from "react-toastify";
import { useApplicationStore } from "../stores/applicationStore";
import { APPLICATIONS } from "../constants/dummyData";
import { useEffect } from "react";

export const useApplications = () => {
   // stores
   const {
      applications,
      isApplicationsLoading,
      setApplications,
      setIsApplicationsLoading,
   } = useApplicationStore();

   // effect functions
   const getApplications = async () => {
      try {
         setIsApplicationsLoading(true);

         // simulate API call
         await new Promise((resolve) => setTimeout(resolve, 2000));

         setApplications(APPLICATIONS);
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
   }, []);

   return {
      applications,
      isApplicationsLoading,
      setApplications,
   };
};
