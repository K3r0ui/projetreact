import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { loginJoueur } from '../../services/joueur.service';

export default function Loginform() {
   const onFinish = async (values) => {
      try {
         const result = await loginJoueur(values);
         message.success('Log In successfully');
         localStorage.setItem('token', result);
         localStorage.setItem('isCoach', false);
         window.location = '/';
      } catch (error) {
         console.error(error.message);
         message.error('login failed!');
      }
   };

   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <Form
         name='basic'
         initialValues={{ remember: true }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         autoComplete='off'>
         <Form.Item
            label='user email'
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
         </Form.Item>

         <Form.Item
            label='Password'
            name='password'
            rules={[
               { required: true, message: 'Please input your password!' },
            ]}>
            <Input.Password />
         </Form.Item>

         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
               Submit
            </Button>
         </Form.Item>
      </Form>
   );
}
