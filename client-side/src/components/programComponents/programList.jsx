import React from 'react';
import Program from './program';

export default function ProgramList({
   data,
   onDeleteProgram,
   onUpdateProgram,
   setData,
}) {
   return (
      <table class='table mt-3'>
         <thead>
            <tr>
               <th scope='col'>#</th>
               <th scope='col'>Nom du programme</th>
               <th scope='col'>Description</th>
               <th scope='col'>Image</th>
               <th scope='col'>Lien Video</th>
               <th scope='col'>Action</th>
            </tr>
         </thead>
         <tbody>
            {data.map((program, index) => (
               <Program
                  key={program._id}
                  index={index}
                  program={program}
                  onDeleteProgram={onDeleteProgram}
                  onUpdateProgram={onUpdateProgram}
                  setData={setData}
               />
            ))}
         </tbody>
      </table>
   );
}
