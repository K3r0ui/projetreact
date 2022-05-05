import { message, Button, Modal, Space, Card, Rate, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModifierSeanceForm from '../../components/SeanceComponents/SeanceForm/ModifierSeanceForm';
import { getSeance, updateSeance } from '../../services/seance.service';
import StatDetail from './StatDetail';

export default function SeanceDetail() {
   const { id } = useParams();
   const isJ = localStorage.getItem('isCoach') === 'false';

   const [data, setData] = useState(null);
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await getSeance(id);
            setData(result);
         } catch (error) {
            console.error(error.response);
            message.error(error.response.data);
         }
      };

      fetchData();
   }, []);

   const handleOk = () => {
      setVisible(false);
   };
   const handleCancel = () => {
      setVisible(false);
   };

   const onFinish = async (entryDTO) => {
      try {
         const result = await updateSeance(data._id, entryDTO);
         setData(result);
         setVisible(false);
         message.success('seance updated successfully');
      } catch (error) {
         console.log('error', error.message);
         message.error('update failed');
      }
   };

   const onFinishFailed = () => {};

   return (
      <div className='container'>
         {data && (
            <div>
               {data.etat == 'Annuler' ? (
                  <h2>
                     Cette seance est annuler a la raison de {data.raisonannul}
                  </h2>
               ) : (
                  <>
                     <br />
                     {!isJ && (
                        <Button onClick={() => setVisible(true)}>
                           Modifier La seance
                        </Button>
                     )}
                     <br />
                     <br />
                     <h5>titre : </h5>
                     {data.titre} <br />
                     <h5>date: </h5>le
                     {new Date(data.date.toString()).getUTCDate()}/
                     {new Date(data.date.toString()).getMonth() + 1}/
                     {new Date(data.date.toString()).getFullYear()} &thinsp; à{' '}
                     {new Date(data.date.toString()).getUTCHours()}:
                     {new Date(data.date.toString()).getUTCMinutes()}:
                     {new Date(data.date.toString()).getUTCSeconds()}
                     <br />
                     <h5>lieu : </h5>
                     {data.lieu.name} - {data.lieu.address} -{' '}
                     {data.lieu.country} <br />
                     <h5>Programme: </h5>
                     <Space
                        direction='vertical'
                        size='middle'
                        style={{ display: 'flex' }}>
                        <Card title={data.program.name} size='small'>
                           <p>{data.program.description}</p>
                           <div
                              style={{
                                 display: 'flex',
                                 justifyContent: 'space-around',
                              }}>
                              <img
                                 src={data.program.image}
                                 style={{ width: '250px', height: '200px' }}
                              />
                              <iframe
                                 src={data.program.videoLink}
                                 title='YouTube video'
                                 allowfullscreen></iframe>
                           </div>
                        </Card>
                     </Space>
                     <div
                        className='mt-5'
                        style={{
                           display: 'flex',
                           justifyContent: 'space-evenly',
                        }}>
                        <div>
                           <center>
                              {' '}
                              <h5> Competences </h5>
                           </center>
                           <Space
                              direction='vertical'
                              size='middle'
                              style={{ display: 'flex', width: '400px' }}>
                              {data.competences
                                 .filter((c) => (isJ ? c.isVisible : c))
                                 .map((c) => (
                                    <Card title={c.title} size='small'>
                                       <p>{c.description}</p>
                                       <a href={c.link} target={'_blank'}>
                                          {' '}
                                          {c.link}{' '}
                                       </a>
                                       <Rate disabled value={c.stars} /> <br />
                                       {!isJ && (
                                          <Switch
                                             disabled={true}
                                             checked={c.isVisible}
                                          />
                                       )}
                                    </Card>
                                 ))}{' '}
                           </Space>
                        </div>
                        <div>
                           <center>
                              <h5> Statistiques</h5>
                           </center>
                           <Space
                              direction='vertical'
                              size='middle'
                              style={{ display: 'flex', width: '400px' }}>
                              {data.statistiques.map((s) => (
                                 <StatDetail s={s} isJ={isJ} />
                              ))}{' '}
                           </Space>
                        </div>
                     </div>
                     <br />
                  </>
               )}
            </div>
         )}
         <br />

         <Modal
            title='modifier une seance'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            okButtonProps={{ disabled: true }}>
            <ModifierSeanceForm
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               data={data}
            />
         </Modal>
      </div>
   );
}
