import { useState } from 'react';
import {  Popconfirm,Modal } from 'antd';
import { Form, Input, message, Button, Space } from 'antd';
import DefiForm from '../DefiForm/DefiForm';


const Defi = (props) => {
     //destractering
    const {defi,handleUpdateDefi} =props;
    const [visible, setVisible] = useState(false);

    //fonctions pour formulaire
    const [form] = Form.useForm();
     

    //faire la mise a jour 
    const finish = (description,lien) => {
      
      handleUpdateDefi(defi._id,description,lien);
     
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
      deleteDefi();   
      
    });
    const deleteDefi =()=>{
       
       props.deleteDefi(defi._id);

    }

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
      <td>{defi.description}</td>
      <td>{defi.link}</td>
      <td> <iframe src={defi.link} title="YouTube video" allowfullscreen></iframe></td>
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
          title="Modifier un defi"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: true }}
        
        >
         <DefiForm finish={ finish} initialValues={{ lien:defi.link,description:defi.description }}/>
        </Modal> 
        
        
        </>  );
}
 
export default Defi;