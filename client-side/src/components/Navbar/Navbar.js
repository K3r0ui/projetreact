import React from 'react';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
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

const NavbarApp = () => {
   return (
      <>
         <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Container>
               <Navbar.Brand href='/'>Accueil</Navbar.Brand>

               <Navbar.Toggle aria-controls='responsive-navbar-nav' />
               <Navbar.Collapse id='responsive-navbar-nav'>
                  <Nav className='me-auto'>
                     <Nav.Link href='#features'>Features</Nav.Link>
                     <Nav.Link href='pricing'>Pricing</Nav.Link>
                     <NavDropdown title='Coach' id='collasible-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.1'>
                           Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/defis'>defis</NavDropdown.Item>
                        <NavDropdown.Item href='/events'>
                           Evennements
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/prorammes'>
                           Programme Seance
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/seances'>
                           Séances
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href='/compentence'>
                           Compentence
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/stat'>
                           Statistique
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href='#action/3.4'>
                           Equipes
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/invitation'>
                           Inviter Joueurs
                        </NavDropdown.Item>
                     </NavDropdown>

                     <NavDropdown title='Joueur' id='collasible-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.1'>
                           Action
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/joueur/events'>
                           Evennements
                        </NavDropdown.Item>

                        <NavDropdown.Item href='/lieu'>Lieu</NavDropdown.Item>
                        <NavDropdown.Item href='/profilejoueur'>
                           profile joueur
                        </NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item href='#action/3.4'>
                           Equipes
                        </NavDropdown.Item>
                     </NavDropdown>
                  </Nav>
                  <Nav>
                     <Nav.Link href='/login'>Login</Nav.Link>
                     <Nav.Link href='/register'>Register</Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path='/defis' element={<DefiPage />} />
            <Route path='/seances' element={<SeancePage />} />
            <Route path='/joueur/events' element={<EventsJoueurPage />} />
            <Route path='/lieu' element={<LieuPage />} />

            <Route path='/compentence' element={<CompentencePage />} />
            <Route path='/stat' element={<StatPage />} />
            <Route path='/invitation' element={<InvitationPage />} />

            <Route path='/profilejoueur' element={<ProfilejcPage />} />

            <Route path='/events' element={<EventsPage />} />
            <Route path='/prorammes' element={<ProgramSeance />} />
            <Route path='/not-found' element={<Page404 />} />

            <Route path='/annuler' element={<Refused />} />
            <Route path='/accepter' element={<Accepted />} />

            <Route path='*' element={<Navigate to='/not-found' replace />} />
         </Routes>
      </>
   );
};

export default NavbarApp;
