import { useState } from 'react';
import { Popconfirm, Modal } from 'antd';
import { message } from 'antd';
import LieuForm from '../LieuForm/LieuForm';
const Lieu = (props) => {
   const { lieu, handleDeleteLieuById, handleUpdateLieu, setData } = props;
   const [visible, setVisible] = useState(false);

   //fonctions pour formulaire

   //faire la mise a jour
   const finish = (name, city, country, address) => {
      handleUpdateLieu(lieu._id, name, city, country, address);

      setVisible(false);
      console.log('Received values of form: ', values);
   };

   const onFinishFailed = () => {
      message.error('Submit failed!');
   };
   //--fonctions pour confirmer la ssuppression
   const confirm = () =>
      new Promise((resolve) => {
         setTimeout(() => resolve(), 2000);
         const result = handleDeleteLieuById(lieu._id);
         console.log(result);
      });

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
            <th scope='row'>1</th>
            <td>{lieu.name}</td>
            <td>{lieu.city}</td>
            <td> {lieu.country}</td>
            <td> {lieu.address}</td>
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
            title='Modifier un Lieu'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: true }}>
            <LieuForm
               finish={finish}
               initialValues={{
                  name: lieu.name,
                  description: lieu.description,
                  etat: lieu.etat,
               }}
            />
         </Modal>
      </>
   );
};

export default Lieu;
