import { message } from 'antd';
import React, { createContext, useEffect, useState } from 'react';
import { getCurrentCoachProfile } from './services/profile.service';

export const UserContext = createContext(null);

const UserProvider = ({ children, isCoach }) => {
   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            if (isCoach) {
               const result = await getCurrentCoachProfile();
               setCurrentUser(result);
               message.success('fetch user success');
            }
         } catch (error) {
            message.error('fetch user failed');
         }
      };
      fetchData();
   }, []);

   return (
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
         {children}
      </UserContext.Provider>
   );
};

export default UserProvider;
