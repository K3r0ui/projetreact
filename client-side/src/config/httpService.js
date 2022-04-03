import Axios from 'axios';

const instance = Axios.create({
  baseURL: `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`,
});

instance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log('logging err : ', error);
    alert('Something unexpected happened !');
  }
  return Promise.reject(error);
});

export default instance;
