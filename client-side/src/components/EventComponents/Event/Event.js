import { useState,  useEffect } from 'react';
import { Popconfirm, Modal } from 'antd';
import { message } from 'antd';
import EventForm from '../EventForm/EventForm';
const Event = (props) => {
   const { event, handleDeleteEventById, handleUpdateEvent, setData } = props;
   const [visible, setVisible] = useState(false);
   const [visibleC, setVisibleC] = useState(false);
   const [partcipPlayers,setPartcipPlayers]= useState("")
   const [interestedPlayers,setInterestedPlayers]=useState("")


   //fonctions pour formulaire

   //faire la mise a jour
   useEffect(() => {
      const getStatus = async () => {
       

          let partPlayers= "";
          let intPlayers="";
          event.joueurs.map((joueur)=>{
            if (joueur.status==="participer")
            {
              partPlayers+=joueur.joueur.firstName+" "+joueur.joueur.lastName+" | "
            }
            else if(joueur.status==="interessé")
            {
              intPlayers+=joueur.joueur.firstName+" "+joueur.joueur.lastName+" | "

            }
          })
          setPartcipPlayers(partPlayers);
          setInterestedPlayers(intPlayers);
          
         


  
      };
      getStatus();
    }, [event]);
   const finish = (name, description, etat) => {
      handleUpdateEvent(event._id, name, description, etat);

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
         const result = handleDeleteEventById(event._id);
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
    


   const consulter = () => {
     
      console.log(partcipPlayers)
      console.log(interestedPlayers)
      setVisibleC(true);
    };
   const handleOkC = () => {
      setVisibleC(false);
   };
   const handleCancelC = () => {
      setVisibleC(false);
   };

   return (
      <>
         <tr>
            <th scope='row'>1</th>
            <td>{event.name}</td>
            <td>{event.description}</td>
            <td> {event.etat}</td>
            <td>
               <div
                  class='btn-group'
                  role='group'
                  aria-label='Basic mixed styles example'>
                   <button
                     type='button'
                     onClick={consulter}
                     class='btn btn-primary'>
                     consulter
                  </button>   
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
            <EventForm
               finish={finish}
               initialValues={{
                  name: event.name,
                  description: event.description,
                  etat: event.etat,
               }}
            />
         </Modal>


         <Modal
            title='liste de Joueur'
            visible={visibleC}
            onOk={handleOkC}
            onCancel={handleCancelC}
            okButtonProps={{ disabled: true }}>
             <h3>liste de joueur</h3>
         </Modal>
      </>
   );
};

export default Event;
