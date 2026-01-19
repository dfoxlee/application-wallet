import pool from "../db/db-config.js";

export const getUserByEmail = async (email) => {
   const query = `
      SELECT 
         user_number as userNumber,
         email,
         hashed_password as hashedPassword,
         token,
         created_date as createdDate,
         last_login as lastLogin
      FROM user 
      WHERE email = ?
   `;

   const values = [email];

   const [results] = await pool.query(query, values);

   return results[0];
};

export const createUser = async ({
   email,
   hashedPassword,
   token,
   createdDate,
}) => {
   const query = `
      INSERT INTO user (email, hashed_password, token, created_date) 
      VALUES (?, ?, ?, ?)
   `;

   const values = [email, hashedPassword, token, createdDate];

   const [results] = await pool.query(query, values);

   if (!results.affectedRows) {
      throw new Error("User creation failed");
   }

   return results.insertId;
};

export const updateUser = async (updatedUser) => {
   const { userNumber, email, hashedPassword, token, createdDate, lastLogin } =
      updatedUser;

   const query = `
      UPDATE user
      SET email = ?, hashed_password = ?, token = ?, created_date = ?, last_login = ? 
      WHERE user_number = ?
   `;

   const values = [
      email,
      hashedPassword,
      token,
      createdDate,
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
