import { create } from "zustand";

interface ModalStoreType {
   // states
   modalTitle: string | null;
   viewApplicationNumber: number | null;
   authType: "login" | "signup" | null;

   // actions
   setModalTitle: (modalTitle: string | null) => void;
   setViewApplicationNumber: (applicationNumber: number | null) => void;
   setAuthType: (authType: "login" | "signup" | null) => void;
   resetModal: () => void;
}

export const useModalStore = create<ModalStoreType>((set) => ({
   // states
   modalTitle: null,
   viewApplicationNumber: null,
   authType: null,

   // actions
   setModalTitle: (modalTitle) => set({ modalTitle }),

   setViewApplicationNumber: (applicationNumber) =>
      set({ viewApplicationNumber: applicationNumber }),

   setAuthType: (authType) => set({ authType }),

   resetModal: () =>
      set({
         modalTitle: null,
         viewApplicationNumber: null,
         authType: null,
      }),
}));
