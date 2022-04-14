import { Card, message, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { payerabonnement } from '../../services/payment.service';
import { UserContext } from '../../UserProvider';
import './pricing.css';

export default function PricingPage() {
   const { currentUser, setCurrentUser } = useContext(UserContext);
   const [visible, setVisible] = useState(false);
   const [option, setOption] = useState('');

   let type, date;
   if (currentUser) {
      type = currentUser.abonnement?.type;
      date = currentUser && new Date(currentUser.abonnement?.doc);

      date =
         new Date(date).getDate() +
         '/' +
         (new Date(date).getMonth() + 1) +
         '/' +
         (new Date(date).getFullYear() + 1);
   }

   const payer = async (type) => {
      setVisible(true);
      setOption(type);
      // const res = await payerabonnement(type);
      // message.success('payment success!');
   };

   const handleOk = async () => {
      try {
         const res = await payerabonnement(option);
         setCurrentUser(res);
         message.success('payment success!');
      } catch (error) {
         console.log(error.message);
         message.error('payment failed!');
      }
      setVisible(false);
   };
   const handleCancel = () => {
      setVisible(false);
   };

   return (
      <div className='container mt-5 '>
         <h3>Découvrez nos services de tarification ici</h3>
         <h3>
            Vous êtes déjà inscrit dans la catégorie : {type}, jusqu'au {date}
         </h3>
         <h3>Vous pouvez en choisir un:</h3>
         <div className='cards-flex'>
            <Card
               title='FREE'
               bordered={false}
               style={
                  type == 'free'
                     ? { width: 300, background: 'grey' }
                     : { width: 300 }
               }>
               <p>Avec cette stratégie, vous n'invitez que 3 personnes</p>
               <button
                  type='button'
                  onClick={() => payer('free')}
                  class='btn btn-primary'>
                  payer
               </button>
            </Card>
            <Card
               title='BASIC'
               bordered={false}
               style={
                  type == 'basic'
                     ? { width: 300, background: 'grey' }
                     : { width: 300 }
               }>
               <p>Avec cette stratégie, vous n'invitez que 10 personnes</p>
               <button
                  type='button'
                  onClick={() => payer('basic')}
                  class='btn btn-primary'>
                  payer
               </button>
            </Card>
            <Card
               title='PREMIUM'
               bordered={false}
               style={
                  type == 'premium'
                     ? { width: 300, background: 'grey' }
                     : { width: 300 }
               }>
               <p>
                  Avec cette stratégie, vous pouvez inviter un nombre illimité
                  de personnes
               </p>
               <button
                  type='button'
                  onClick={() => payer('premium')}
                  class='btn btn-primary'>
                  payer
               </button>
            </Card>
         </div>
         <Modal
            title='Payer votre abonnement'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}>
            Confirmer votre payement ?
         </Modal>
      </div>
   );
}
