import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import SignupForm from '../../components/SignupComponents/SignupForm';
import { register } from '../../services/register.service';
const RegisterPage = ({ user }) => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      password: '',
   });

   const { firstName, lastName, email, dob, password } = values;

   const handleChange = (firstName) => (e) => {
      setValues({ ...values, [firstName]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await register(firstName, lastName, email, password, dob);
         message.success('Sign up succesffully , Please Login Now');
         setValues({
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            password: '',
         });
         navigate('/login');
      } catch (err) {
         console.error(err.message);
         message.error('register failed!');
      }
   };
   if (user) return <Navigate to='/' replace />;
   return (
      <><SignupForm  handleSubmit={handleSubmit} handleChange={handleChange} />
         {/* <div class='container p-4 mt-4'>
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
         </div> */}
      </>
   );
};

export default RegisterPage;
