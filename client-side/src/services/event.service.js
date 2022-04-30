import axios from 'axios';
const config = {
    headers:{
        'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
        'x-auth-token': localStorage.getItem('token')
    }
  };
const url="http://localhost:8080/event/coach";  


export const getAllEvents = async () => {
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
export const addEvent = async (name, description, etat) => {
   try {
      const data = {
         name: name,
         description: description,
         etat: etat,
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
export const updateEvent = async (id, name, description, etat) => {
   try {
      const data = {
         name: name,
         description: description,
         etat: etat,
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

export const deleteEventById = async (id) => {
   try {
      await axios.delete(url + '/' + id, config);
      return true;
      // setData(data.filter(defi=>defi._id !== id))    )
   } catch (error) {
      console.log('error');
   }
};

const configJoueur = {
   headers: {
      api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
      'x-auth-token':localStorage.getItem('token')
         
   },
};
const urlJoueur = 'http://localhost:8080/event/joueur';

export const getPrivateEvents = async () => {
   try {
      const result = await axios.get(
         //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
         urlJoueur + '/private',
         configJoueur
      );
      console.log(result.data);
      return result.data;
   } catch (error) {
      console.log('error');
   }
};

export const getPublicEvents = async () => {
   try {
      const result = await axios.get(
         urlJoueur + '/public',
         configJoueur
      );
      console.log(result.data);
      return result.data;
   } catch (error) {
      console.log('error');
   }
};

export const joinEvent = async (id,status) => {
   try {
      const data = {
         status: status,
        
      };
      const result = await axios.put(
            urlJoueur + '/join/' + id,
         data,
         config
      );
      console.log(result);
      return result;
   } catch (error) {
      console.log(error);
   }
};
