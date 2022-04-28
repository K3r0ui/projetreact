
import { Form, Input, message, Button, Space, Rate, Switch } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';



const CompetenceForm = ({ finish, initialValues }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(initialValues.isVisible);

    const onFinish = (values) => {
        values.isVisible = visible
        finish(values);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    function onChange(checked) {
        setVisible(checked)
    }

    return (
        <div className="container mt-2">
            <Form
                initialValues={initialValues}
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    label="title"
                    rules={[{ required: true, message: 'Entrer un titre' }]}
                >
                    <Input placeholder="titre" />

                </Form.Item>
                <Form.Item
                    name="link"
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
                <Form.Item
                    name="stars"
                    label="Note"
                    rules={[{ required: true, message: 'Entrer une note' }]}
                >
                    <Rate />

                </Form.Item>
                <Form.Item
                    name="isVisible"
                    label="Visible"
                >
                    <Switch onChange={onChange} defaultChecked={initialValues.isVisible} />

                </Form.Item>
                <Form.Item>
                    <center>
                        <Space>
                            <Button type="primary" className="btn btn-primary" htmlType="submit">
                                Submit
                            </Button>

                        </Space>
                    </center>
                </Form.Item>


            </Form>
        </div>
    );
};

export default CompetenceForm;
