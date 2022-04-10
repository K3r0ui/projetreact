import axios from 'axios';
import { useEffect, useState } from 'react';
const AccessDeniedPage = () => {
   const [msg, setMsg] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         const { data } = await axios.get(
            //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
            'http://localhost:8080/',
            {
               headers: {
                  api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
               },
            }
         );
         setMsg(data);
      };
      fetchData();
   }, []);

   return (
      <>
         <h1>NO PREMISSIONS </h1>
      </>
   );
};

export default AccessDeniedPage;
