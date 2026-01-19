import { create } from "zustand";
import type { ApplicationType } from "../types/applicationTypes";

interface ApplicationStoreType {
   // states
   applications: ApplicationType[];

   // actions
   setApplications: (applications: ApplicationType[]) => void;
}

export const useApplicationStore = create<ApplicationStoreType>((set) => ({
   // states
   applications: [],

   // actions
   setApplications: (applications: ApplicationType[]) =>
      set(() => ({ applications })),
}));
