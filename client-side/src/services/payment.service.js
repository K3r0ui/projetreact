import axios from 'axios';
const config = {
   headers: {
      api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
      'x-auth-token': localStorage.getItem('token'),
   },
};

const url = 'http://localhost:8080/coach/payerabonnement';

export const payerabonnement = async (option) => {
   const { data } = await axios.put(url, { type: option }, config);
   return data;
};
