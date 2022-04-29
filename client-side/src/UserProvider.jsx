import { message } from 'antd';
import React, { createContext, useEffect, useState } from 'react';
import { getProfile } from './services/joueur.service';
import { getCurrentCoachProfile } from './services/profile.service';

export const UserContext = createContext(null);

const UserProvider = ({ children, isCoach }) => {
   const [currentUser, setCurrentUser] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            let result;
            if (isCoach == 'true') {
               result = await getCurrentCoachProfile();
            } else {
               result = await getProfile();
            }
            setCurrentUser(result);
            message.success('fetch user success');
         } catch (error) {
            localStorage.clear();
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
