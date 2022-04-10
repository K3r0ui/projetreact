import axios from 'axios';
const config = {
   headers: {
      api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
      'x-auth-token':
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTAzZWE1N2U5NDM4N2RlY2FmMTMxNyIsImlhdCI6MTY0OTQyNzQ5NywiZXhwIjoxNjQ5NDYzNDk3fQ.UfUG4dSvQifSxux72VdfJez8LS0eZtRaGqH_BoeLPDw',
   },
};

export const addDefi = async (description, lien) => {
   try {
      const data = {
         firstName: description,
         link: lien,
      };
      const result = await axios.post(
         //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
         'http://localhost:8080/coach/signup',
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
