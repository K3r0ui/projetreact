
import React from 'react'
import { Button, DatePicker, Form, Input, InputNumber, message, Radio, Space, } from 'antd';


const PasswordCoachForm = ({ finishPasswordUpdate }) => {
    const [form] = Form.useForm();
    form.resetFields();

    const onFinish = (values) => {
        finishPasswordUpdate(values.oldPassword, values.newPassword);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    return (
        <div className='container mt-2'>
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'>
                <Form.Item
                    name="oldPassword"
                    label="Ancien mot de passe"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your old password!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Input your old password' />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="Nouveau mot de passe"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
                        },

                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Input your new password' />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirmer mot de passe"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='Confirm your password' />
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
            </Form>
        </div>
    )
}

export default PasswordCoachForm