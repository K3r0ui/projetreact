import moment from 'moment';
import React from 'react';

export default function Seance({ index, seance }) {
   return (
      <tr>
         <th scope='row'>{index + 1}</th>
         <td>{seance.titre}</td>
         <td>{moment(seance.date).format('DD-MM-YYYY hh:mm')}</td>
         <td>{seance.lieu.address + ' - ' + seance.lieu.city}</td>
         <td>{seance.program.name}</td>
      </tr>
   );
}
