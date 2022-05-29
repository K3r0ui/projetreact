import { useState } from 'react';
import { Link, useNavigate,Navigate  } from 'react-router-dom';
import { message } from 'antd';
import "antd/dist/antd.css";
import { login } from '../../services/register.service';
import SigninForm from '../../components/SignInComponents/SignInForm';
const LoginPage = ({ user }) => {
   const [values, setValues] = useState({
      email: '',
      password: '',
   });

   const { email, password } = values;

   const handleChange = (email) => (e) => {
      console.log(e.target.value);
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
         localStorage.setItem('isCoach', true);
         if ( res.coach.firstAuth === true ){
            localStorage.setItem('firstAuth', true);
             return window.location = '/firstauth';
         }else{
         localStorage.setItem('firstAuth', false);
         window.location = '/';}
      } catch (err) {
         console.error(err.message);
         message.error('login failed!');
      }
   };
   if (user) return <Navigate to='/' replace />;
   return (
      <>
        <SigninForm handleSubmit={handleSubmit} handleChange={handleChange}  />
      </>
   );
};

export default LoginPage;
