import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Seance({ index, seance }) {
   return (
      <tr>
         <th scope='row'>{index + 1}</th>
         <td>
            <Link to={'/seance/' + seance._id}>{seance.titre}</Link>
         </td>
         <td>{moment(seance.date).format('DD-MM-YYYY hh:mm')}</td>
         <td>{seance.lieu.address + ' - ' + seance.lieu.city}</td>
         <td>{seance.program.name}</td>
      </tr>
   );
}
