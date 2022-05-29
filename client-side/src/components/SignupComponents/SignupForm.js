import React from 'react';
import { Form, Input, Button , DatePicker } from "antd";
import moment from 'moment';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
function SignupForm({ handleChange, handleSubmit }) {

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
      <>
      <br></br>
      <Form
      {...layout}
      name="nest-messages"
      validateMessages={validateMessages}
      
    >
      <Form.Item
          name="firstName"
          label='Nom'
          rules={[{ required: true, message: 'Entrer le nom de Coach' }]}>
          <Input placeholder='Nom de Coach' onChange={handleChange('firstName')} />
      </Form.Item>
      <Form.Item
          name="lastName"
          label="Prenom"
          rules={[
              { required: true, message: 'Entrer le Prenom de Coach' },
          ]}>
          <Input placeholder='Prenom du Coach' onChange={handleChange('lastName')} />
      </Form.Item>

      <Form.Item name="dob" label="Date de naissance"
              rules={[
                {
                  required: true,
                }
              ]}>
          <Input onChange={handleChange("dob")}/>
      </Form.Item>
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
      <Form.Item
                    name="confirm"
                    label="Confirmer mot de passe"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='Confirm your password' />
                </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" onClick={handleSubmit} >
          Submit
        </Button>
        Or <Link to="/login">Login now!</Link>
      </Form.Item>
    </Form>
    </> );
   
}

export default SignupForm;
