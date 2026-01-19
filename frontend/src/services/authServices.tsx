const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8008/api/v1";

export const fetchLogin = async ({
   email,
   password,
}: {
   email: string;
   password: string;
}) => {
   const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
   });

   if (!response.ok) {
      throw new Error("Login request failed");
   }

   return response.json();
};

export const fetchSignup = async ({
   email,
   password,
}: {
   email: string;
   password: string;
}) => {
   const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
   });

   if (!response.ok) {
      throw new Error("Signup request failed");
   }

   return response.json();
};

export const fetchValidateToken = async (token: string) => {
   const response = await fetch(
      `${baseUrl}/auth/validate-token`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ token }),
      },
   );

   if (!response.ok) {
      throw new Error("Token validation failed");
   }

   return response.json();
};
