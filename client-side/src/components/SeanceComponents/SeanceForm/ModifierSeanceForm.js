import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Form, Col, Row, DatePicker, Input, Select, Button } from 'antd';
import { getAllLieus } from '../../../services/lieu.service';
import { getAllCompetence } from '../../../services/competence.service';
import { getAllStat } from '../../../services/stat.service';
const { Option } = Select;

export default function ModifierSeanceForm({ onFinish, onFinishFailed, data }) {
   const [form] = Form.useForm();
   const [lieux, setLieux] = useState([]);
   const [competances, setCompetances] = useState([]);
   const [statistiques, setStatistiques] = useState([]);
   const [statsVls, setStatsVls] = useState([]);
   const [seanceData] = useState({ ...data });
   seanceData.date = moment(new Date(data.date), 'DD/MM/YYYY');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const resultLieu = await getAllLieus();
            setLieux(resultLieu);
            const resultComp = await getAllCompetence();
            setCompetances(resultComp);
            const resultStat = await getAllStat();
            setStatistiques(resultStat);
         } catch (error) {
            console.log('error', error.message);
         }
      };
      fetchData();
      const dato = { ...data };
      // setSeanceData(data);

      seanceData.lieu = dato.lieu._id;
      seanceData.competences = dato.competences.map((c) => c._id);
      const intialStatsIds = dato.statistiques.map((c) => c.statistique);
      const initialFields = dato.statistiques.map((c) => ({
         statistique: c.statistique,
         valeur: c.valeur,
      }));
      setStatsVls(initialFields);
      seanceData.statistiques = intialStatsIds;
      form.resetFields();
   }, []);

   const handleChangeStatistique = (value) => {
      const values = value.map((v) => {
         let i;
         if (
            statsVls.some((e) => {
               i = e;
               return e.statistique == v.value;
            })
         ) {
            return {
               statistique: v.value,
               valeur: i.valeur,
            };
         } else
            return {
               statistique: v.value,
               valeur: 0,
            };
      });
      statsVls.map((s) => form.resetFields([s.statistique]));
      setStatsVls(values);
   };

   const finish = (values) => {
      const stats = Object.entries(values.stat);
      const entryDTO = {
         titre: values.titre,
         date: values.date.format('YYYY-MM-DD h:mm:ss'),
         competences: values.competences,
         lieu: values.lieu,
         statistiques: stats.map((s) => {
            return {
               statistique: s[0],
               valeur: s[1],
            };
         }),
      };

      onFinish(entryDTO);
   };

   return (
      <Form
         initialValues={seanceData}
         form={form}
         layout='vertical'
         onFinish={finish}
         onFinishFailed={onFinishFailed}
         autoComplete='off'>
         <Form.Item
            name='titre'
            label='Nom de la s??ance'
            rules={[
               {
                  required: true,
                  message: 'Entrer un nom',
               },

               {
                  type: 'string',
                  min: 6,
               },
            ]}>
            <Input placeholder='Nom de la s??ance' />
         </Form.Item>

         <Form.Item
            name='date'
            rules={[
               { required: true, message: 'choisir la date de la s??ance' },
            ]}
            label='Date et Heure de la s??ance '>
            <DatePicker showTime placeholder='selectionner une date' />
         </Form.Item>

         <Form.Item
            label='Competances'
            name='competences'
            rules={[{ required: true, message: 'choisir des comp??tances' }]}>
            <Select
               mode='multiple'
               allowClear
               placeholder='Selectionner les statistiques'>
               {competances.map((competance) => (
                  <Option key={competance._id}>{competance.title}</Option>
               ))}
            </Select>
         </Form.Item>

         <Form.Item
            name='statistiques'
            rules={[{ required: true, message: 'choisir des statistiques' }]}
            label='Statistiques'>
            <Select
               mode='multiple'
               allowClear
               labelInValue={true}
               placeholder='Selectionner les statistiques'
               onChange={handleChangeStatistique}>
               {statistiques.map((statistique) => (
                  <Option key={statistique._id}>{statistique.title}</Option>
               ))}
            </Select>
         </Form.Item>

         <Row gutter={14}>
            {statsVls.map((field) => (
               <>
                  <Col className='gutter-row' span={4}>
                     <Form.Item
                        name={['stat', field.statistique]}
                        label={
                           statistiques.length !== 0
                              ? statistiques.filter(
                                   (s) => s._id == field.statistique
                                )[0].title
                              : ''
                        }
                        rules={[
                           { required: true, message: 'entrer une valeur' },
                        ]}>
                        <Input
                           name={field.statistique}
                           onChange={(e) => {
                              const name = e.currentTarget.name;
                              const statsVlsC = [...statsVls];
                              statsVlsC.map((s) => {
                                 if (s.statistique === name) {
                                    s.valeur = e.currentTarget.value;
                                 }
                              });

                              setStatsVls(statsVlsC);
                           }}
                           style={{ width: '80%' }}
                           placeholder='Valeur'
                           defaultValue={field.valeur}
                        />
                     </Form.Item>
                  </Col>
                  <br />
               </>
            ))}
         </Row>
         <div className='container'>
            <Form.Item name='jou' label='Joueur'>
               <Select
                  placeholder='Selectionner un joueur'
                  defaultValue='sj'
                  disabled>
                  <Option value='sj'>
                     {seanceData
                        ? seanceData.joueur.lastName +
                          ' ' +
                          seanceData.joueur.firstName
                        : ''}
                  </Option>
               </Select>
            </Form.Item>
            <Row>
               <Col span={12}>
                  <Form.Item name='programme' label='Programme'>
                     <Select
                        placeholder='Selectionner un programme'
                        defaultValue='sp'
                        disabled>
                        <Option value='sp'>
                           {seanceData ? seanceData.program.name : ''}
                        </Option>
                     </Select>
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item name='lieu' label='Lieu'>
                     <Select name='lieu' placeholder='Selectionner le lieu'>
                        {lieux.map((lieu) => (
                           <Option key={lieu._id} value={lieu._id}>
                              {lieu.name}
                           </Option>
                        ))}
                     </Select>
                  </Form.Item>
               </Col>
            </Row>
         </div>

         <Form.Item>
            <center>
               <Button
                  type='primary'
                  className='btn btn-primary'
                  htmlType='submit'>
                  Submit
               </Button>
            </center>
         </Form.Item>
      </Form>
   );
}
