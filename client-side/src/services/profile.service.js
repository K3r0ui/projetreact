import axios from 'axios';
const config = {
   headers: {
      api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
      'x-auth-token': localStorage.getItem('token'),
   },
};
const url = 'http://localhost:8080/coach/';

export const getCurrentCoachProfile = async () => {
   const { data } = await axios.get(url + 'profile', config);
   return data;
};

export const getAllJoueurs = async () => {
   try {
      const result = await axios.get(url + 'alljoueurs', config);
      console.log(result.data);
      return result.data;
   } catch (error) {
      console.log('error');
   }
};
