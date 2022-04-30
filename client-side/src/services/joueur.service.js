import axios from 'axios';

const config = {
   headers: {
      'x-auth-token': localStorage.getItem('token'),
   },
};
const configCoach = {
    headers: {
        api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
        'x-auth-token':
        localStorage.getItem('token'),
    },
};




export const getAllPlayers = async () => {
    try {
        const { data } = await axios.get(
            'http://localhost:8080/coach/alljoueurs',
            configCoach
        );
        return data;
    } catch (error) {
        console.log('error');
    }
};


export const getAllPlayersI = async () => {
   try {
       const { data } = await axios.get(
           'http://localhost:8080/coach/alljoueursI',
           configCoach
       );
       return data;
   } catch (error) {
       console.log('error');
   }
};

export const getOnePlayer = async (id) => {
   try {
      
       const { data } = await axios.get(
           'http://localhost:8080/coach/alljoueursI/'+id,
           configCoach
       );
       console.log(data);
       return data;
   } catch (error) {
       console.log('error');
   }
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
