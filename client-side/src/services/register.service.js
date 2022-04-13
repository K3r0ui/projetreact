import axios from 'axios';

export const login = async (email, password) => {
   const input = {
      email,
      password,
   };
   const { data } = await axios.post(
      'http://localhost:8080/coach/login',
      input
   );
   return data;
};

export const register = async (firstName, lastName, email, password, dob) => {
   const input = {
      firstName,
      lastName,
      email,
      password,
      dob,
   };
   const { data } = await axios.post(
      'http://localhost:8080/coach/signup',
      input
   );
   return data;
};
