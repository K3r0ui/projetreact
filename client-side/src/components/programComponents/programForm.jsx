import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import 'antd/dist/antd.css';

export default function ProgrammForm({ finish, initialValues }) {
   const [form] = Form.useForm();

   const onFinish = (values) => {
      finish(values.name, values.description, values.image, values.videoLink);
   };

   const onFinishFailed = () => {
      message.error('Submit failed!');
   };

   return (
      <div class='container mt-5'>
         <Form
            initialValues={initialValues}
            form={form}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'>
            <Form.Item
               name='name'
               label='Nom de programme'
               rules={[
                  {
                     required: true,
                     message: 'Entrer un lien exacte',
                  },
               ]}>
               <Input placeholder='Nom de programme' />
            </Form.Item>
            <Form.Item
               name='description'
               label='Description'
               rules={[{ required: true, message: 'Entrer une description' }]}>
               <Input.TextArea
                  showCount
                  maxLength={100}
                  placeholder='Description'
               />
            </Form.Item>
            <Form.Item name='image' label='Image'>
               <Input placeholder='Entrer image' />
            </Form.Item>
            <Form.Item name='videoLink' label='lien video'>
               <Input placeholder='Entrer lien video' />
            </Form.Item>
            <Form.Item>
               <center>
                  <Space>
                     <Button
                        type='primary'
                        class='btn btn-primary'
                        htmlType='submit'>
                        Submit
                     </Button>
                  </Space>
               </center>
            </Form.Item>
         </Form>
      </div>
   );
}
