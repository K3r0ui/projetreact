import './App.css';
import React from 'react';
import NavbarApp from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from './UserProvider';

function App() {
   return (
      <UserProvider isCoach={localStorage.getItem('isCoach')}>
         <div className='App'>
            <NavbarApp />
         </div>
      </UserProvider>
   );
}

export default App;
