import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CoachDropMenu() {
   return (
      <NavDropdown title='Coach' id='collasible-nav-dropdown'>
         <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/defis'>
            defis
         </NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/events'>
            Evennements
         </NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/prorammes'>
            Programme Seance
         </NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/seances'>
            Séances
         </NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/lieu'>
            Lieu
         </NavDropdown.Item>
         <NavDropdown.Divider />
         <NavDropdown.Item as={Link} to='/compentence'>
            Compentence
         </NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/stat'>
            Statistique
         </NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/profilejoueur'>
            Liste profile joueurs
         </NavDropdown.Item>
         <NavDropdown.Divider />
         <NavDropdown.Item href='#action/3.4'>Equipes</NavDropdown.Item>
         <NavDropdown.Item as={Link} to='/invitation'>
            Inviter Joueurs
         </NavDropdown.Item>
      </NavDropdown>
   );
}
