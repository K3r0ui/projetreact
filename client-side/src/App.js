import React from 'react';
import NavbarApp from './components/Navbar/Navbar';
import UserProvider from './UserProvider';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
   return (
      <UserProvider isCoach={localStorage.getItem('isCoach')}>
         <BrowserRouter>
            <NavbarApp />
         </BrowserRouter>
      </UserProvider>
   );
}

export default App;
