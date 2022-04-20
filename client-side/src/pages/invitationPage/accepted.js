import React, { useEffect, useState } from 'react';
import {
   acceptInvitation,
   finishJoueurCreation,
} from '../../services/invitation.service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
   Button,
   DatePicker,
   Form,
   Input,
   InputNumber,
   message,
   Radio,
   Space,
} from 'antd';
import moment from 'moment';

export default function Accepted() {
   const [joueurData, setJoueurData] = useState(null);
   const [form] = Form.useForm();

   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const idJ = searchParams.get('idjoueur');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await acceptInvitation(idJ);
            setJoueurData(res);
            form.resetFields();
         } catch (error) {
            console.error(error.response);
            message.error(error.response.data);
         }
      };
      fetchData();
   }, []);

   //    useEffect(() => {
   //       form.resetFields();
   //    }, [joueurData]);

   const onFinish = async (values) => {
      try {
         const res = await finishJoueurCreation(values, idJ);
         message.success('submit success!');
         navigate('/login');
      } catch (error) {
         console.error(error.message);
         message.error('submit failed!');
      }
   };

   const onFinishFailed = () => {
      message.error('Submit failed!');
   };

   const initialValues = joueurData
      ? {
           firstName: joueurData.firstName,
           lastName: joueurData.lastName,
           dob: joueurData.dob ? moment(joueurData.dob, 'DD/MM/YYYY') : null,
           pob: joueurData.pob,
           sexe: joueurData.sexe,
           job: joueurData.job,
           ville: joueurData.ville,
           telephone: joueurData.telephone,
           taille: joueurData.taille,
           poid: joueurData.poid,
           orientation: joueurData.orientation,
           price: joueurData.price,
           nbscweek: joueurData.nbscweek,
        }
      : {};

   console.log('initialValues', initialValues);

   return (
      <div className='container mt-5'>
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
               rules={[{ required: true, message: 'Entrer le nom de Joueur' }]}>
               <Input placeholder='Nom de Joueur' />
            </Form.Item>
            <Form.Item
               name='lastName'
               label='Prenom'
               rules={[
                  { required: true, message: 'Entrer le Prenom de Joueur' },
               ]}>
               <Input placeholder='Prenom de Joueur' />
            </Form.Item>
            <Form.Item
               name='password'
               label='Password'
               rules={[{ required: true, message: 'Entrer password' }]}>
               <Input.Password placeholder='input password' />
            </Form.Item>

            <Form.Item name='dob' label='Date de naissance'>
               <DatePicker />
            </Form.Item>
            <Form.Item name='pob' label='Lieu de Naissance'>
               <Input placeholder='Lieu de naissance' />
            </Form.Item>
            <Form.Item name='sexe' label='Sexe'>
               <Radio.Group>
                  <Radio value={'homme'}>Homme</Radio>
                  <Radio value={'femme'}>Femme</Radio>
               </Radio.Group>
            </Form.Item>

            <Form.Item name='job' label='Poste de travail'>
               <Input placeholder='Poste de travail' />
            </Form.Item>
            <Form.Item name='ville' label='Addresse'>
               <Input placeholder='Addresse' />
            </Form.Item>

            <Form.Item name='telephone' label='Phone Number'>
               <Input placeholder='Telephone' />
            </Form.Item>

            <Form.Item name='taille' label='Taille (CM)'>
               <InputNumber placeholder='0' min={0} />
            </Form.Item>
            <Form.Item name='poid' label='Poid (KG)'>
               <InputNumber placeholder='0' min={0} />
            </Form.Item>
            <Form.Item name='orientation' label='Orientation'>
               <Radio.Group>
                  <Radio value={'droitier'}>Droitier</Radio>
                  <Radio value={'gaucher'}>Gaucher</Radio>
               </Radio.Group>
            </Form.Item>
            <Form.Item name='price' label='Prix de seance (DT)'>
               <InputNumber placeholder='0' min={0} disabled />
            </Form.Item>
            <Form.Item name='nbscweek' label='nombre de seance par une semaine'>
               <InputNumber placeholder='0' min={1} disabled />
            </Form.Item>

            <br></br>
            <Form.Item>
               <center>
                  <Space>
                     <Button
                        disabled={!joueurData}
                        type='primary'
                        className='btn btn-primary'
                        htmlType='submit'>
                        Submit
                     </Button>
                  </Space>
               </center>
            </Form.Item>
            <br></br>
         </Form>
      </div>
   );
}
