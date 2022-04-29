import axios from 'axios';
const config = {
   headers: {
      api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
      'x-auth-token':
      localStorage.getItem('token'),
   },
};
const url = 'http://localhost:8080/lieu/coach';

export const getAllLieus = async () => {
   try {
      const result = await axios.get(
         //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
         url,
         config
      );
      console.log(result.data);
      return result.data;
   } catch (error) {
      console.log('error');
   }
};
export const addLieu = async (name, city, country, address) => {
   try {
      const data = {
         name: name,
         city: city,
         country: country,
         address: address,
      };
      const result = await axios.post(
         //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
         url,
         data,
         config
      );
      console.log(result);
      return result;
   } catch (error) {
      console.log('erreur');
      console.log(error);
   }
};
export const updateLieu = async (id, name, city, country, address) => {
   try {
      const data = {
         name: name,
         city: city,
         country: country,
         address: address,
      };
      const result = await axios.put(
         //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
         url + '/' + id,
         data,
         config
      );
      console.log(result);
   } catch (error) {
      console.log(error);
   }
};

export const deleteLieuById = async (id) => {
   try {
      await axios.delete(url + '/' + id, config);
      return true;
      // setData(data.filter(defi=>defi._id !== id))    )
   } catch (error) {
      console.log('error');
   }
};
