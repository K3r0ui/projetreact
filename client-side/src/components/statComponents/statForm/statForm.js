
import { Form, Input, message, Button, Space, Radio, Switch, Row, Col } from 'antd';
import { useState } from 'react';



const StatForm = ({ finish, initialValues }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(initialValues.isVisible);
    const [alert, setAlert] = useState(initialValues.alert);

    const onFinish = (values) => {
        values.isVisible = visible
        values.alert = alert
        finish(values);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    function onChange(checked) {
        setVisible(checked)
    }
    function onChangeA(checked) {
        setAlert(checked)
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
                    rules={
                        [{ required: true, message: 'Entrer un titre' }]
                    }
                >
                    <Input placeholder="titre " />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Entrer une description' }]}
                >
                    <Input.TextArea showCount maxLength={100} placeholder="Description" />

                </Form.Item>

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
                    name="type"
                    label="type"
                    rules={
                        [{ required: true, message: 'Entrer une type' }]
                    }
                >
                    <Input placeholder="type" />
                </Form.Item>

                <Form.Item
                    name="unite"
                    label="Unité"
                    rules={
                        [{ required: true, message: 'Entrer une unité' }]
                    }
                >
                    <Input placeholder="unite" />
                </Form.Item>

                <Form.Item
                    name="max"
                    label="Maximiser Ou Minimiser"
                    rules={
                        [{ required: true, message: 'Maximiser Ou Minimiser is required' }]
                    }
                >
                    <Radio.Group >
                        <Radio value={"Maximiser"}>Maximiser</Radio>
                        <Radio value={"Minimiser"}>Minimiser</Radio>
                    </Radio.Group>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="isVisible"
                            label="Visible"
                        >
                            <Switch onChange={onChange} defaultChecked={initialValues.isVisible} />

                        </Form.Item>
                    </Col>
                    <Form.Item
                        name="alert"
                        label="Alert"
                    >
                        <Switch onChange={onChangeA} defaultChecked={initialValues.alert} />

                    </Form.Item>

                </Row>


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
export default StatForm;