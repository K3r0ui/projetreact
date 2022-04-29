import React from 'react';
import { Navigate } from 'react-router-dom';
import Loginform from '../../components/loginJoueurComponent/loginForm';

export default function LoginJoueurPage({ user }) {
   if (user) return <Navigate to='/' replace />;
   return (
      <div className='container p-2 mt-5'>
         <div className='col-lg-6 col-md-12 mt-4'>
            <Loginform />
         </div>
      </div>
   );
}
