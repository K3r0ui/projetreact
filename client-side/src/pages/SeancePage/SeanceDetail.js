import { message, Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModifierSeanceForm from '../../components/SeanceComponents/SeanceForm/ModifierSeanceForm';
import { getSeance, updateSeance } from '../../services/seance.service';

export default function SeanceDetail() {
   const { id } = useParams();

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
               {' '}
               titre : {data.titre} <br />
               etat : {data.etat} <br />
               date: {data.date.toString()}
               <br />
               lieu : {data.lieu.name} <br />
               statistiques: {data.statistiques.map(
                  (s) => s.valeur + ' - '
               )}{' '}
               <br />
               competences: {data.competences.map((c) => c.title + ' - ')}{' '}
               <br />
               prog : {data.program.name}{' '}
            </div>
         )}
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
         <Button onClick={() => setVisible(true)}>Modifier La seance</Button>
      </div>
   );
}
