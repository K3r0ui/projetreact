import React from 'react'
import { Button, DatePicker, Form, Input, InputNumber, message, Radio, Space, } from 'antd';
import moment from 'moment';
function ProfileCoachForm({initialValues,finish}) {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        finish(values);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    const disabledDate =(d) => {!d || d.isAfter("2002-12-31") || d.isSameOrBefore("1960-01-01")}
      
  return (
  <Form
      initialValues={initialValues}
      form={form}
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'>
      <Form.Item
          name='firstName'
          label='Nom'
          rules={[{ required: true, message: 'Entrer le nom de Coach' }]}>
          <Input placeholder='Nom de Coach' />
      </Form.Item>
      <Form.Item
          name='lastName'
          label='Prenom'
          rules={[
              { required: true, message: 'Entrer le Prenom de Coach' },
          ]}>
          <Input placeholder='Prenom du Coach' />
      </Form.Item>

      <Form.Item name='dob' label='Date de naissance'>
          <DatePicker disabledDate={disabledDate} defaultPickerValue={moment("2002-12-31")} />
      </Form.Item>
      <br />
      <Form.Item>
          <center>
              <Space>
                  <Button
                      type='primary'
                      className='btn btn-primary'
                      htmlType='submit'>
                      Submit
                  </Button>
              </Space>
          </center>
      </Form.Item>
      <br/>
  </Form>

)
}

export default ProfileCoachForm