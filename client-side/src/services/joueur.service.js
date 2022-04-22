import axios from 'axios';

const config = {
   headers: {
      'x-auth-token': localStorage.getItem('token'),
   },
};

export const getProfile = async () => {
   try {
      const { data } = await axios.get(
         'http://localhost:8080/joueur/profile',
         config
      );
      return data;
   } catch (error) {
      console.log('error');
   }
};

export const updateJoueur = async ({ dob, ...rest }) => {
   let date;
   if (dob) {
      date = dob.format('DD/MM/YYYY');
   }
   const { data } = await axios.put(
      'http://localhost:8080/joueur/modifierprofile',
      { ...rest, ...(dob && { dob: date }) },
      config
   );
   return data;
};

export const updatePassword = async (oldPassword, newPassword) => {
   const password = {
      oldPassword: oldPassword,
      newPassword: newPassword,
   };
   const { data } = await axios.put(
      'http://localhost:8080/joueur/modifierpassword',
      password,
      config
   );
   return data;
};

export const loginJoueur = async (form) => {
   const { data } = await axios.post(
      'http://localhost:8080/joueur/login',
      form
   );
   return data;
};
