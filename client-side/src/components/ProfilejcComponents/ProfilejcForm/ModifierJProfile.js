import { Button, DatePicker, Form, Input, InputNumber, message, Radio, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react'

export default function ModifierJProfile({ initialValues, finish }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        finish(initialValues._id, values);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    initialValues.dob = initialValues.dob ? moment(initialValues.dob, 'YYYY-MM-DD') : null


    return (
        <div class='container'>
            <Form
                initialValues={initialValues}
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


                <Form.Item name="dob" label="Date de Naissance">
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="pob"
                    label="Lieu de Naissance"
                >
                    <Input placeholder="Lieu de Naissance" />

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
                    label="Poste de travail"
                >
                    <Input placeholder="Poste de Travail" />

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
                    name="taille"
                    label="Taille (CM)"
                >
                    <InputNumber placeholder="0" min={0} />

                </Form.Item>
                <Form.Item
                    name="poid"
                    label="Poid (KG)"
                >
                    <InputNumber placeholder="0" min={0} />

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
                <Form.Item
                    name="price"
                    label="Prix de seance (DT)"
                >
                    <InputNumber placeholder="0" min={0} />
                </Form.Item>

                <br />
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
            )

        </div >
    )
}
