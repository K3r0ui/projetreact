import { useState } from 'react';
import {  Popconfirm,Modal } from 'antd';
import {  message } from 'antd';
import EventForm from '../EventForm/EventForm';
const Event = (props) => {

const {event ,handleDeleteEventById, handleUpdateEvent, setData}=props;
const [visible, setVisible] = useState(false);

    //fonctions pour formulaire
     

    //faire la mise a jour 
    const finish = (name,description,etat) => {
      
        handleUpdateEvent(event._id,name,description,etat);
     
      setVisible(false);
       console.log('Received values of form: ', values);
      
    };
  
    const onFinishFailed = () => {
      message.error('Submit failed!');
    }
    //--fonctions pour confirmer la ssuppression 
    const confirm = () =>
    new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
      const result=handleDeleteEventById(event._id)   ;
      console.log(result);
      
    });
   

    // fonction pour popup  
    const modifier =()=>{
      setVisible(true);

    }
    const handleOk=()=>{
      setVisible(false);
    }
    const handleCancel=()=>{
      setVisible(false);
    }



    return (<>
    
    <tr>
      <th scope="row">1</th>
      <td>{event.description}</td>
      <td>{event.name}</td>
      <td> {event.etat}</td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" onClick={modifier} class="btn btn-secondary">modifier</button>
          <Popconfirm
            title="Title"
            onConfirm={confirm}
            onVisibleChange={() => console.log('visible change')}
          >
            <button type="button"  class="btn btn-danger">supprimer</button>
            </Popconfirm>
        </div>
      </td>
    </tr>
    
    
    <Modal
          title="Modifier un evennement"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: true }}
        
        >
         <EventForm finish={ finish} initialValues={{ name:event.name,description:event.description,etat:event.etat }}/>
        </Modal> 
    </>  );
    
}
 
export default Event;