import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SigninForm from '../../components/SignInComponents/SignInForm';
const LoginPage = () => {
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

   const [values, setValues] = useState({
      email: '',
      password: '',
   });

   const { email, password } = values;

   const handleChange = (email) => (e) => {
      //console.log(e.target.value);
      setValues({ ...values, [email]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const { data } = await axios.post(
            'http://localhost:8080/coach/login',
            {
               email,
               password,
            }
         );

         toast.success('Log In successfully');
         if (typeof window !== 'undefined') {
            localStorage.setItem('token', JSON.stringify(data));
         }

         if (data.success === true) {
            setValues({
               email: '',
               password: '',
            });
         }
         /* if (signUser.data.success === true) {
            setValue({
               firstName: '',
               lastName: '',
               email: '',
               dob: '',
               password: '',
            }); 
         }*/
      } catch (err) {
         toast.error(err.response.data);
      }
   };
   return (
      <>
         <ToastContainer />
         <div class='container p-4 mt-4'>
            <div class='row justify-content-evenly mt-4'>
               <div class='col-lg-6 col-md-12 mt-4'>
                  <div class='d-flex'>
                     <i class='fa-solid fa-right-to-bracket fs-1 mx-2'></i>{' '}
                     <h2>Login</h2>
                  </div>
                  <div
                     class='p-6 shadow-lg p-3 mb-5 bg-body rounded'
                     style={{ backgroundColor: 'white' }}>
                     <form>
                        <SigninForm
                           label='Email'
                           type='text'
                           value={email}
                           onChange={handleChange('email')}
                        />
                        <SigninForm
                           label='Password'
                           type='password'
                           value={password}
                           onChange={handleChange('password')}
                        />
                        <div class='d-flex justify-content-between'>
                           <button
                              type='submit'
                              onClick={handleSubmit}
                              class='btn btn-outline-primary'>
                              Sign In <i class='fa-solid fa-floppy-disk'></i>
                           </button>
                           <Link to='/register'>I don't have account</Link>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default LoginPage;
