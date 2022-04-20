
import { Form, Input, message, Button, Space, Select } from 'antd';
import 'antd/dist/antd.css';



const StatForm = ({ finish, initialValues, forUpdate, discipline }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        finish(values.title, values.description, values.lien, values.type, values.unite, values.discipline);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

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
                    label="unite"
                    rules={
                        [{ required: true, message: 'Entrer une unité' }]
                    }
                >
                    <Input placeholder="unite" />
                </Form.Item>

                {!forUpdate && (<Form.Item
                    name="discipline"
                    label="discipline"
                    rules={
                        [{ required: true, message: 'select un discipline' }]
                    }
                >
                    <Select defaultValue="discipline">
                        <Select.Option value="discipline" disabled>Discipline</Select.Option>
                        {discipline.map((discipline) => (
                            <Select.Option value={discipline._id}> {discipline.description} </Select.Option>
                        ))}

                    </Select>
                </Form.Item>)
                }
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