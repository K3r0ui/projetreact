
import { Form, Input, message, Button, Space, Radio, DatePicker, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import { useNavigate, } from "react-router-dom";



const InvitationForm = (props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isVisible, setVisible] = useState(false)

    const onFinish = (values) => {
        props.finish(values.firstName, values.lastName, values.email, values.dob, values.pob, values.sexe, values.job, values.ville, values.telephone, values.price, values.taille, values.poid, values.orientation, values.nbscweek);
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
                    name="firstName"
                    label="Nom"
                    rules={[{ required: true, message: 'Entrer le nom de Joueur' }]}
                >
                    <Input placeholder="Nom de Joueur" />

                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Prenom"
                    rules={[{ required: true, message: 'Entrer le Prenom de Joueur' }]}
                >
                    <Input placeholder="Prenom de Joueur" />

                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Entrer email de Joueur' },
                        { type: "email", message: 'email n\'est pas valid ' }
                    ]}
                >
                    <Input placeholder="Email" />

                </Form.Item>
                {!isVisible && (
                    <Form.Item>
                        <center>
                            <Space>

                                <Button type="primary" className="btn btn-primary" onClick={() => setVisible(true)}>
                                    Plus D'information
                                </Button>

                            </Space>
                        </center>
                    </Form.Item>
                )}
                {isVisible && (
                    <>
                        <Form.Item name="dob" label="Date de naissence">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            name="pob"
                            label="Lieu de Naissence"
                        >
                            <Input placeholder="Lieu de naissance" />

                        </Form.Item>
                        <Form.Item
                            name="sexe"
                            label="Sexe"
                        >
                            <Radio.Group >
                                <Radio value={"homme"}>Homme</Radio>
                                <Radio value={"femme"}>Femme</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="job"
                            label="Post de travaille"
                        >
                            <Input placeholder="Post de Travaille" />

                        </Form.Item>
                        <Form.Item
                            name="ville"
                            label="Addresse"
                        >
                            <Input placeholder="Addresse" />
                        </Form.Item>

                        <Form.Item
                            name="telephone"
                            label="Phone Number"
                        >
                            <Input placeholder="Telephone" />
                        </Form.Item>

                        <Form.Item
                            name="price"
                            label="Prix de seance"
                        >
                            <div><InputNumber placeholder="0" min={0} />
                                &nbsp;DT</div>

                        </Form.Item>
                        <Form.Item
                            name="taille"
                            label="Taille"
                        >
                            <div><InputNumber placeholder="0" min={0} />
                                &nbsp;CM</div>
                        </Form.Item>
                        <Form.Item
                            name="poid"
                            label="Poid"
                        >
                            <div><InputNumber placeholder="0" min={0} />
                                &nbsp;KG</div>
                        </Form.Item>
                        <Form.Item
                            name="orientation"
                            label="Orientation"
                        >
                            <Radio.Group >
                                <Radio value={"droitier"}>Droitier</Radio>
                                <Radio value={"gaucher"}>Gaucher</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="nbscweek"
                            label="nombre de seance par une semaine"
                        >
                            <InputNumber placeholder="0" min={1} />
                        </Form.Item>

                        <Form.Item>
                            <center>
                                <Space>
                                    <Button type="primary" className="btn btn-primary" onClick={() => setVisible(false)}>
                                        moins D'information
                                    </Button>

                                </Space>
                            </center>
                        </Form.Item>
                    </>
                )}
                <br></br>
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

export default InvitationForm;
