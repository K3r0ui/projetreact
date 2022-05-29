import React from 'react'
import { Form, Select, message, Button, Space,DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { getDefiNotAssigned } from '../../../services/joueur.service'
import moment from 'moment';
import 'antd/dist/antd.css'; 
function AssignedForm(props) {
  const [form] = Form.useForm();
  const [joueur,setJoueurs] = useState([]);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      
        const resultJoueur = await getDefiNotAssigned(props.defi._id);
        if (resultJoueur.data) {
            setJoueurs(resultJoueur.data);
            console.log('resultJoueur',resultJoueur)
          }
       
    };
    fetchData();
}, []); 

  function handleChange(value) {
     console.log(`selected ${value}`);
    setData(value)
    
   }
   console.log(data) ;
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }
  const onFinish = (values) => {
      form.resetFields();
      props.finishassigner(values.joueur,values.delai.format("YYYY-MM-DD"));
     console.log(values);
     message.success('Submit success!');
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  console.log()
  return (
    <div class="container mt-5">
    <Form
    

      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <Form.Item 
        name="joueur"
        label="Joueur"
        rules={[{ required: true, message: 'Entrer un joueur' }]}>
        <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select"
      onChange={handleChange}
    >
      {
    joueur.map(x =><Option key={x._id}>{ x.firstName+""+x.lastName}</Option>)}
    </Select>
        </Form.Item>
        <Form.Item 
   name="delai"
   label="Delai"
   rules={[{ required: true, message: 'choisir le delai' }]} 
  >
        <DatePicker showTime       format="YYYY-MM-DD"
      disabledDate={disabledDate} placeholder='selectionner une delai' style={{ width: '50%' }}/>
    </Form.Item>
      <Form.Item>
      <center>
        <Space>
        
          <Button type="primary" class="btn btn-primary" htmlType="submit">
            Submit
          </Button>
          
        </Space>
        </center>
      </Form.Item>
    

    </Form>
    </div>
  );
}

export default AssignedForm;