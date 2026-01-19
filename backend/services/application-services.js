import pool from "../db/db-config.js";

export const getApplicationsByUserNumber = async (userNumber) => {
   const query = `
      SELECT
         application_number as applicationNumber,
         title,
         company,
         description
      FROM application
      WHERE user_number = ?;
   `;

   const values = [userNumber];

   const [results] = await pool.execute(query, values);

   return results;
};

export const getApplicationByApplicationNumber = async (applicationNumber) => {
   const query = `
      SELECT
         application_number as applicationNumber,
         user_number as userNumber,
         title,
         company,
         description
      FROM application
      WHERE application_number = ?;
   `;

   const values = [applicationNumber];

   const [results] = await pool.execute(query, values);

   return results[0];
};

export const createApplication = async ({
   userNumber,
   title,
   company,
   description,
}) => {
   const query = `
      INSERT INTO application (user_number, title, company, description)
      VALUES (?, ?, ?, ?);
   `;

   const values = [userNumber, title, company, description];

   const [result] = await pool.execute(query, values);

   if (!result.affectedRows) {
      throw new Error("Failed to create application");
   }

   return result.insertId;
};

export const updateApplication = async ({
   applicationNumber,
   userNumber,
   title,
   company,
   description,
}) => {
   const query = `
      UPDATE application
      SET title = ?, company = ?, description = ?
      WHERE application_number = ? AND user_number = ?;
   `;

   const values = [title, company, description, applicationNumber, userNumber];

   const [result] = await pool.execute(query, values);

   return result.affectedRows > 0;
};

export const deleteApplication = async (applicationNumber, userNumber) => {
   const query = `
      DELETE FROM application
      WHERE application_number = ? AND user_number = ?;
   `;

   const values = [applicationNumber, userNumber];

   const [result] = await pool.execute(query, values);

   return result.affectedRows > 0;
};
