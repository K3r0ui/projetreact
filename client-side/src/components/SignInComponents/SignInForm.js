import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
function SigninForm({ handleChange, handleSubmit }) {
   const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!"
      }
    };
    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    };
   return (
      
      // <div className=' mb-3'>
      //    <label className='form-label'>{label}</label>
      //    <div className='input-group'>
      //       <span className='input-group-text' id='basic-addon1'>
      //          <i className='fa-solid fa-user'></i>
      //       </span>
      //       <input
      //          type={type}
      //          className='form-control'
      //          onChange={onChange}
      //          required
      //       />
      //    </div>
      // </div>
   <>
   
   <Form
      {...layout}
      name="nest-messages"
      validateMessages={validateMessages}
      
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            type: "email"
          }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Put your email" onChange={handleChange('email')}/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
          }
        ]}
      >
        <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Put your password" onChange={handleChange('password')} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" onClick={handleSubmit} >
          Submit
        </Button>
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
    </>);
}

export default SigninForm;
