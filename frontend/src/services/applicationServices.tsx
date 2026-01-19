import type { ApplicationType } from "../types/applicationTypes";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8008/api/v1";

export const fetchApplications = async (token: string) => {
   const response = await fetch(`${baseUrl}/applications`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   return response.json();
};

export const fetchCreateApplication = async (
   token: string,
   newApplication: ApplicationType,
) => {
   const response = await fetch(`${baseUrl}/applications`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newApplication }),
   });

   return response.json();
};

export const fetchUpdateApplication = async (
   token: string,
   updatedApplication: ApplicationType,
) => {
   const response = await fetch(`${baseUrl}/applications`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ updatedApplication }),
   });

   return response.json();
};

export const fetchDeleteApplication = async (
   token: string,
   applicationNumber: number,
) => {
   const response = await fetch(`${baseUrl}/applications`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ applicationNumber }),
   });

   return response.json();
};
