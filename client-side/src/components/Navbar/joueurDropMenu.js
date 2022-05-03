import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function JoueurDropMenu() {
   return (
      <NavDropdown title='Joueur' id='collasible-nav-dropdown'>
         <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/joueur/events'>
            Evennements
         </NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/joueur/defi'>
            Evennements
         </NavDropdown.Item>
         <NavDropdown.Divider />
         <NavDropdown.Item as={Link} to='/profile'>
            Profile
         </NavDropdown.Item>
         <NavDropdown.Divider />
         <NavDropdown.Item href='#action/3.4'>Equipes</NavDropdown.Item>
      </NavDropdown>
   );
}
