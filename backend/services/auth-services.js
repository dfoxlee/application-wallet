import pool from "../db/db-config.js";

export const getUserByEmail = async (email) => {
   const query = `
      SELECT * 
      FROM user 
      WHERE email = ?
   `;

   const values = [email];

   const { results } = await pool.query(query, values);

   return results[0];
};

export const createUser = async ({ email, confirmationToken, createdDate }) => {
   const query = `
      INSERT INTO user (email, confirmation_token, created_date) 
      VALUES (?, ?, ?)
   `;

   const values = [email, confirmationToken, createdDate];

   const { results } = await pool.query(query, values);

   if (!results.affectedRows) {
      throw new Error("User creation failed");
   }

   return results.insertId;
};

export const updateUser = async (updatedUser) => {
   const {
      userNumber,
      email,
      confirmationToken,
      token,
      createdDate,
      confirmationDate,
      lastLogin,
   } = updatedUser;

   const query = `
      UPDATE user
      SET email = ?, confirmation_token = ?, token = ?, created_date = ?, confirmation_date = ?, last_login = ? 
      WHERE user_number = ?
   `;

   const values = [
      email,
      confirmationToken,
      token,
      createdDate,
      confirmationDate,
      lastLogin,
      userNumber,
   ];

   await pool.query(query, values);

   return;
};

export const deleteUserByUserNumber = async (userNumber) => {
   const query = `
      DELETE FROM user 
      WHERE user_number = ?
   `;

   const values = [userNumber];

   await pool.query(query, values);

   return;
};
