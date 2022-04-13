import React, { useState } from 'react';
import { Popconfirm, Modal } from 'antd';
import ProgrammForm from './programForm';

export default function Program({
   program,
   onDeleteProgram,
   onUpdateProgram,
   index,
}) {
   const [visible, setVisible] = useState(false);

   //faire la mise a jour
   const finish = (name, description, image, videoLink) => {
      onUpdateProgram(program._id, name, description, image, videoLink);
      setVisible(false);
   };
   //--fonctions pour confirmer la suppression
   const confirm = async () => {
      await onDeleteProgram(program._id);
   };
   // fonction pour popup
   const modifier = () => {
      setVisible(true);
   };
   const handleOk = () => {
      setVisible(false);
   };
   const handleCancel = () => {
      setVisible(false);
   };

   return (
      <>
         <tr>
            <th scope='row'>{index + 1}</th>
            <td>{program.name}</td>
            <td>{program.description}</td>
            <td>{program.image}</td>
            <td>{program.videoLink}</td>
            <td>
               <div
                  class='btn-group'
                  role='group'
                  aria-label='Basic mixed styles example'>
                  <button
                     type='button'
                     onClick={modifier}
                     class='btn btn-secondary'>
                     modifier
                  </button>
                  <Popconfirm
                     title='Title'
                     onConfirm={confirm}
                     onVisibleChange={() => console.log('visible change')}>
                     <button type='button' class='btn btn-danger'>
                        supprimer
                     </button>
                  </Popconfirm>
               </div>
            </td>
         </tr>

         <Modal
            title='Modifier un evennement'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: true }}>
            <ProgrammForm
               finish={finish}
               initialValues={{
                  name: program.name,
                  description: program.description,
                  image: program.image,
                  videoLink: program.videoLink,
               }}
            />
         </Modal>
      </>
   );
}
