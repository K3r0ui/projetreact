import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import SigninForm from '../../components/SignInComponents/SignInForm';
import { login } from '../../services/register.service';

const LoginPage = () => {
   const navigate = useNavigate();
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
         const res = await login(email, password);
         message.success('Log In successfully');
         localStorage.setItem('token', res.token);
         setValues({
            email: '',
            password: '',
         });
         navigate('/');
      } catch (err) {
         console.error(err.message);
         message.error('login failed!');
      }
   };
   return (
      <>
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
                              type='values.
                              values.submit'
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
