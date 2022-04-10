import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/SignupComponents/SignupForm';
const RegisterPage = () => {
   const [msg, setMsg] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         const { data1 } = await axios.get(
            //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
            'http://localhost:8080/',
            {
               headers: {
                  api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
               },
            }
         );
         setMsg(data1);
      };
      fetchData();
   }, []);
   const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      password: '',
   });
   const { firstName, lastName, email, dob, password } = values;
   const handleChange = (firstName) => (e) => {
      //console.log(e.target.value);
      setValues({ ...values, [firstName]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const { data } = await axios.post(
            'http://localhost:8080/coach/signup',
            {
               firstName,
               lastName,
               email,
               dob,
               password,
            }
         );
         toast.success('Sign up succesffully , Please Login Now');

         if (data.success === true) {
            console.log(data.success);
            setValues({
               firstName: '',
               lastName: '',
               email: '',
               dob: '',
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
         console.log(err);

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
                     <h2>Register</h2>
                  </div>
                  <div
                     class='p-6 shadow-lg p-3 mb-5 bg-body rounded'
                     style={{ backgroundColor: 'white' }}>
                     <form>
                        <SignupForm
                           label='First Name'
                           type='text'
                           value={firstName}
                           onChange={handleChange('firstName')}
                        />
                        <SignupForm
                           label='Last Name'
                           type='text'
                           value={lastName}
                           onChange={handleChange('lastName')}
                        />
                        <SignupForm
                           label='email'
                           type='email'
                           value={email}
                           onChange={handleChange('email')}
                        />
                        <SignupForm
                           label='dob'
                           type='date'
                           value={dob}
                           onChange={handleChange('dob')}
                        />
                        <SignupForm
                           label='Password'
                           type='password'
                           value={password}
                           onChange={handleChange('password')}
                           required
                        />
                        <div class='d-flex justify-content-between'>
                           <button
                              type='submit'
                              onClick={handleSubmit}
                              class='btn btn-outline-primary'>
                              Save <i class='fa-solid fa-floppy-disk'></i>
                           </button>
                           <Link to='/login'>I have account</Link>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default RegisterPage;
