import React from 'react';
import CoachDropMenu from './coachDropMenu';
import JoueurDropMenu from './joueurDropMenu';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarApp = () => {
   return (
      <>
         <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Container>
               <Navbar.Brand as={Link} to='/'>
                  Accueil
               </Navbar.Brand>

               <Navbar.Toggle aria-controls='responsive-navbar-nav' />
               <Navbar.Collapse id='responsive-navbar-nav'>
                  <Nav className='me-auto'>
                     <Nav.Link as={Link} to='/features'>
                        Features
                     </Nav.Link>

                     {localStorage.getItem('isCoach') == 'true' ? (
                        <>
                           <Nav.Link as={Link} to='/myprofile'>
                              Myprofile
                           </Nav.Link>
                           <Nav.Link as={Link} to='/pricing'>
                              Pricing
                           </Nav.Link>
                           <CoachDropMenu />
                        </>
                     ) : (
                        <JoueurDropMenu />
                     )}
                  </Nav>
                  <Nav>
                     <Nav.Link as={Link} to='/logout'>
                        Logout
                     </Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   );
};

export default NavbarApp;
