import React from 'react'
import { Navbar, NavDropdown, Container, Form, FormControl, Button, Nav } from 'react-bootstrap'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DefiPage from '../../pages/DefiPage/DefiPage';
import EventsPage from '../../pages/EventsPage/EventsPage';
import HomePage from '../../pages/HomePage/HomePage';




const NavbarApp = () => {
    return ( 
<>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/">Godfadher</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Coach" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="defis">defis</NavDropdown.Item>
        <NavDropdown.Item href="events">Evennements</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Equipes</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
<BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="defis" element={<DefiPage/>} />
      <Route path="events" element={<EventsPage/>} />
     
    </Routes>
  </BrowserRouter>

        </>

     );
}
 
export default NavbarApp;