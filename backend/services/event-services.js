import pool from "../db/db-config.js";

export const getEventsByApplicationNumber = async (applicationNumber) => {
   const query = `
      SELECT
         event_number as eventNumber,
         event_type as eventType,
         DATE_FORMAT(event_date, '%Y-%m-%d') as eventDate,
         notes
      FROM event
      WHERE application_number = ?;
   `;

   const values = [applicationNumber];

   const [results] = await pool.query(query, values);

   return results;
};

export const createEvent = async ({
   applicationNumber,
   eventType,
   eventDate,
   notes,
}) => {
   const query = `
      INSERT INTO event (application_number, event_type, event_date, notes)
      VALUES (?, ?, ?, ?);
   `;

   const values = [applicationNumber, eventType, eventDate, notes];

   const [result] = await pool.query(query, values);

   if (!result.affectedRows) {
      throw new Error("Failed to create event");
   }

   return result.insertId;
};

export const updateEvent = async ({
   eventNumber,
   eventType,
   eventDate,
   notes,
}) => {
   const query = `
      UPDATE event
      SET event_type = ?, event_date = ?, notes = ?
      WHERE event_number = ?;
   `;

   const values = [eventType, eventDate, notes, eventNumber];

   const [result] = await pool.query(query, values);

   return;
};

export const deleteEvent = async (eventNumber) => {
   const query = `
      DELETE FROM event
      WHERE event_number = ?;
   `;

   const values = [eventNumber];

   const [result] = await pool.query(query, values);

   return;
};
