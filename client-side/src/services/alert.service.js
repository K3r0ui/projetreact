import axios from 'axios';

const config = {
    headers:{
        'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
        'x-auth-token':localStorage.getItem('token')
    }
  };

export const getAllAlert = async () => {
    try {
        const {data} = await axios.get (
            'http://localhost:8080/alert/coach/', config
        )
        return data;
    } catch (error) {
        message.error(error)
    }
}