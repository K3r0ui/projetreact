import axios from 'axios';
const config = {
    headers:{
        'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
        'x-auth-token': localStorage.getItem('token')
    }
  };

  export const getAllSeances =async()=>{
    try {
    const result = await axios.get(
        //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
          'http://localhost:8080/coach/seance', config
        );
        console.log(result.data);
        return result.data;
    } catch (error) {
        
     console.log('error')      }
   
}