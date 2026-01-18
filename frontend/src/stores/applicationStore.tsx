import { create } from "zustand";
import type { ApplicationType } from "../types/applicationTypes";

interface ApplicationStoreType {
   // states
   applications: ApplicationType[];
   isApplicationsLoading: boolean;

   // actions
   setApplications: (applications: ApplicationType[]) => void;
   setIsApplicationsLoading: (isLoading: boolean) => void;
}

export const useApplicationStore = create<ApplicationStoreType>((set) => ({
   // states
   applications: [],
   isApplicationsLoading: false,

   // actions
   setApplications: (applications: ApplicationType[]) =>
      set(() => ({ applications })),
   
   setIsApplicationsLoading: (isLoading: boolean) =>
      set(() => ({ isApplicationsLoading: isLoading })),
}));
