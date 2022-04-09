
import { Form, Input, message, Button, Space } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate, } from "react-router-dom";



const CompetenceForm = (props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values) => {

        props.finish(values.title, values.description, values.lien);
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    return (
        <div className="container mt-5">
            <Form
                initialValues={props.initialValues}

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
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Entrer une description' }]}
                >
                    <Input.TextArea showCount maxLength={100} placeholder="Description" />

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
