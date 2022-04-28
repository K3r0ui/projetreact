import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
   console.log("fzefezfzefezf",user)
   if (!user) {
      console.log("ACHREF");
      return <Navigate to='/' replace />;
      
   }

   return children;
};

export default PrivateRoute;
