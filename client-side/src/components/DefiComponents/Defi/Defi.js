import axios from 'axios';
import { useEffect, useState } from 'react';
import {  Popconfirm,Modal } from 'antd';
import { Form, Input, message, Button, Space } from 'antd';


const Defi = (props) => {
     //destractering
    const {defi,handleUpdateDefi} =props;
   // const [data, setData] = useState();
    const [visible, setVisible] = useState(false);

    //fonctions pour formulaire
    const [form] = Form.useForm();
     

    //faire la mise a jour 
    const onFinish = (values) => {
      
      handleUpdateDefi(defi._id,values.description,values.lien);
      message.success('Submit success!');
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
      <td> <iframe src={props.defi.link} title="YouTube video" allowfullscreen></iframe></td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" onClick={modifier} class="btn btn-danger">modifier</button>
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
        
        >
          <Form
      form={form}
      initialValues={{ lien:defi.link,description:defi.description }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="lien"
        label="URL"
        rules={[
          {
            required: true,
            message: 'Entrer un lien exacte'
          },
          {
            type: 'url',
            warningOnly: true,
          },
          {
            type: 'string',
            min: 6,
          },
        ]}
      >
        <Input placeholder="Lien de vidéo" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Entrer une description' }]}
      >
        <Input.TextArea showCount maxLength={100} placeholder="Description" />
        
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
         
        </Space>
      </Form.Item>
    

    </Form>
        </Modal> 
        
        
        </>  );
}
 
export default Defi;