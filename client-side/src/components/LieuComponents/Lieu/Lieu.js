import { useState, useContext } from 'react';
import { Popconfirm, Modal } from 'antd';
import { message } from 'antd';

import LieuForm from '../LieuForm/LieuForm';
import { UserContext } from './../../../UserProvider';
const Lieu = (props) => {
   const { lieu, handleDeleteLieuById, handleUpdateLieu, setData } = props;
   const [visible, setVisible] = useState(false);
   const { currentUser, setCurrentUser } = useContext(UserContext);
   //fonctions pour formulaire

   //faire la mise a jour
   const finish = (name, city, country, address) => {
      handleUpdateLieu(lieu._id, name, city, country, address);

      setVisible(false);
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
               {currentUser && currentUser._id == lieu.coach && (

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
               )}
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
                  city: lieu.city,
                  country: lieu.country,
                  adresse: lieu.address,
               }}
            />
         </Modal>
      </>
   );
};

export default Lieu;
