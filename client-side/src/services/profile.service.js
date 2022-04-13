import axios from 'axios';
const config = {
   headers: {
      api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
      'x-auth-token':
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTAzZThmN2U5NDM4N2RlY2FmMTMxNSIsImlhdCI6MTY0OTYyNTM0OSwiZXhwIjoxNjQ5NjYxMzQ5fQ.zPn_xDPv2AHptd-avSaPKGBsDwYjYkRRuOJewHPIocA',
   },
};
const url = 'http://localhost:8080/coach/alljoueurs';

export const getAllJoueurs = async () => {
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
