import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserProvider';
import { Routes, Route, Navigate } from 'react-router-dom';
import DefiPage from '../../pages/DefiPage/DefiPage';
import EventsJoueurPage from '../../pages/EventsJoueurPage/EventsJoueurPage';
import EventsPage from '../../pages/EventsPage/EventsPage';
import CompentencePage from '../../pages/compentencePage/compentencePage';
import StatPage from '../../pages/statPage/statPage';
import HomePage from '../../pages/HomePage/HomePage';
import SeancePage from '../../pages/SeancePage/SeancePage';
import InvitationPage from '../../pages/invitationPage/invitationPage.js';
import ProgramSeance from '../../pages/programSeance/programSeance';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import LieuPage from '../../pages/LieuPage/LieuPage';
import ProfilejcPage from '../../pages/ProfilejcPage/ProfilejcPage';
import PricingPage from '../../pages/PricingPage/pricingPage';
import Page404 from '../../pages/404Page/404Page';
import Refused from '../../pages/invitationPage/refused';
import Accepted from '../../pages/invitationPage/accepted';
import ProfilePage from '../../pages/joueur/profilePage';
import LoginJoueurPage from '../../pages/LoginPage/LoginJoueurPage';
import PrivateRoute from './privateRoute';
import SeanceDetail from '../../pages/SeancePage/SeanceDetail';

export default function AppRoutes({ user }) {
   const routes = [
      { path: '/pricing', Component: <PricingPage /> },
      { path: '/defis', Component: <DefiPage /> },
      { path: '/seances', Component: <SeancePage /> },
      { path: '/seance/:id', Component: <SeanceDetail /> },
      { path: '/joueur/events', Component: <EventsJoueurPage /> },
      { path: '/lieu', Component: <LieuPage /> },
      { path: '/compentence', Component: <CompentencePage /> },
      { path: '/stat', Component: <StatPage /> },
      { path: '/invitation', Component: <InvitationPage /> },
      { path: '/profilejoueur', Component: <ProfilejcPage /> },
      { path: '/events', Component: <EventsPage /> },
      { path: '/prorammes', Component: <ProgramSeance /> },
      { path: '/profile', Component: <ProfilePage /> },
      { path: '/logout', Component: <Logout /> },
   ];

   return (
      <Routes>
         <Route path='/' element={<HomePage />} />
         {routes.map((route, index) => (
            <Route
               key={index}
               path={route.path}
               element={
                  <PrivateRoute user={user}>{route.Component}</PrivateRoute>
               }
            />
         ))}

         <Route path='/login' element={<LoginPage user={user} />} />
         <Route path='/loginJoueur' element={<LoginJoueurPage user={user} />} />
         <Route path='/register' element={<RegisterPage user={user} />} />

         <Route path='/not-found' element={<Page404 />} />
         <Route path='/annuler' element={<Refused />} />
         <Route path='/accepter' element={<Accepted />} />

         <Route path='*' element={<Navigate to='/not-found' replace />} />
      </Routes>
   );
}

const Logout = () => {
   useEffect(() => {
      localStorage.clear();
      window.location = '/';
   }, []);
   return null;
};
