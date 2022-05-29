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
      password: '',
      dob: '',
   });

   const { firstName, lastName, email, dob,  password} = values;

   const handleChange = (firstName) => (e) => {
      setValues({ ...values, [firstName]: e.target.value });
      console.log(values.dob)
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await register(firstName,lastName,email,dob,password);
         message.success('Sign up succesffully , Please Login Now');

         navigate('/login');
      } catch (err) {
         console.error(err.message);
         message.error('register failed!');
      }
   };
   if (user) return <Navigate to='/' replace />;
   return (
      <><SignupForm  handleSubmit={handleSubmit} handleChange={handleChange} />
      </>
   );
};

export default RegisterPage;
