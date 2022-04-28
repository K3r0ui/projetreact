import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserProvider, { UserContext } from './UserProvider';
import NavbarApp from './components/Navbar/Navbar';
import AppRoutes from './components/AppRoutes/appRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
   return (
      <UserProvider isCoach={localStorage.getItem('isCoach')}>
         <MainWrapper />
      </UserProvider>
   );
}

export default App;

const MainWrapper = () => {
   // FIXES ROUTES
    const { currentUser } = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
       setUser(currentUser);
    }, [currentUser]);
 
   return (
      <BrowserRouter>
         {user && <NavbarApp />}

         <AppRoutes user={localStorage.getItem('token')} />
      </BrowserRouter>
   );
};
