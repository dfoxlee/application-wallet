import type { EventType } from "../types/applicationTypes";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8008/api/v1";

export const fetchCreateEvent = async (token: string, event: EventType) => {
   const response = await fetch(`${baseUrl}/events`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ event }),
   });

   return response.json();
};

export const fetchUpdateEvent = async (token: string, event: EventType) => {
   const response = await fetch(`${baseUrl}/events`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ event }),
   });

   return response.json();
};

export const fetchDeleteEvent = async (token: string, eventNumber: number) => {
   const response = await fetch(`${baseUrl}/events`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventNumber: eventNumber }),
   });

   return response.json();
};
