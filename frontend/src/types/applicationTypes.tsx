export interface ApplicationType {
   applicationNumber: number;
   company: string;
   title: string;
   description: string;
   events: EventType[];
}

export interface EventType {
   eventNumber: number;
   applicationNumber: number;
   eventType: number;
   eventDate: string;
   notes: string;
}
