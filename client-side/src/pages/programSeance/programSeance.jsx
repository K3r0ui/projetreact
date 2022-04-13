import React from 'react';
import { useEffect, useState } from 'react';
import { Spin, Space, Modal, Empty, message } from 'antd';
import {
   addProgram,
   deleteProgramById,
   getAllPrograms,
   updateProgram,
} from '../../services/programSeance.service';
import ProgramList from '../../components/programComponents/programList';
import ProgrammForm from '../../components/programComponents/programForm';

export default function ProgramSeance() {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const result = await getAllPrograms();
         if (result) {
            setData(result);
         }
         setLoading(false);
      };
      fetchData();
   }, []);

   //fonction pour la supprission
   const onDeleteProgram = async (id) => {
      try {
         const res = await deleteProgramById(id);
         setData(data.filter((program) => program._id !== res));
         message.success('delete success!');
      } catch (error) {
         console.log(error.message);
         message.error('delete failed!');
      }
   };

   // fonction pour fair l'appdate
   const onUpdateProgram = async (id, name, description, image, videoLink) => {
      try {
         const result = await updateProgram(
            id,
            name,
            description,
            image,
            videoLink
         );
         const clonedData = [...data];
         const index = clonedData.findIndex((el) => el._id === result._id);
         clonedData[index] = result;
         setData(clonedData);
         message.success('update success!');
      } catch (error) {
         console.log(error.message);
         message.error('update failed!');
      }
   };

   //-------------fonction pour poupup-----
   const ajouter = () => {
      setVisible(true);
   };

   const handleOk = () => {
      setVisible(false);
   };
   const handleCancel = () => {
      setVisible(false);
   };

   const finish = async (name, description, image, videoLink) => {
      try {
         const response = await addProgram(name, description, image, videoLink);
         setVisible(false);
         setData([response.data, ...data]);
         message.success('Submit success!');
      } catch (error) {
         console.log(error.message);
         message.error('Submit failed!');
      }
   };

   return (
      <>
         <div class='container mt-5 '>
            {' '}
            <button type='button' onClick={ajouter} class='btn btn-primary'>
               Ajouter un programme
            </button>
            {loading && (
               <>
                  <div class='d-flex justify-content-center'>
                     <Space size='middle'>
                        <Spin size='large' />
                     </Space>
                  </div>
               </>
            )}
            {data.length == 0 && !loading && (
               <>
                  <Empty />
               </>
            )}
            {data.length != 0 && !loading && (
               <>
                  {
                     <ProgramList
                        onUpdateProgram={onUpdateProgram}
                        onDeleteProgram={onDeleteProgram}
                        data={data}
                        setData={setData}
                     />
                  }
               </>
            )}
         </div>

         <Modal
            title='Ajouter un programme'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: true }}>
            {<ProgrammForm finish={finish} />}
         </Modal>
      </>
   );
}
