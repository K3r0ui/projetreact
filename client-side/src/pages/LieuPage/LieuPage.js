import React from 'react';
import { useEffect, useState } from 'react';
import { Spin, Space, Modal, Empty } from 'antd';
import LieuForm from '../../components/LieuComponents/LieuForm/LieuForm';
import LieuList from '../../components/LieuComponents/LieuList/LieuList';
import {
   deleteLieuById,
   updateLieu,
   addLieu,
   getAllLieus,
} from '../../services/lieu.service';
const LieuPage = () => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const data2 = await getAllLieus();
         if (data2) {
            setData(data2);
            console.log(data2);
         }
         setLoading(false);
      };
      fetchData();
   }, []);

   //fonction pour la supprission
   const handleDeleteLieuById = (id) => {
      deleteLieuById(id);
      setData(data.filter((lieu) => lieu._id !== id));
   };

   // fonction pour fair l'appdate
   const handleUpdateLieu = (id, name, city, country, address) => {
      updateLieu(id, name, city, country, address);
      const newData = data.map((lieu) => {
         if (lieu._id === id) {
            lieu.name = name;
            lieu.city = city;
            lieu.country = country;
            lieu.address = address;
         }
         return lieu;
      });
      setData(newData);
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

   const finish = async (id, name, city, country, address) => {
      const response = await addLieu(id, name, city, country, address);
      setVisible(false);
      console.log(response.status && response.status == 200);
      if (response.status && response.status == 200) {
         setData([...data, response.data]);
      }
   };

   //-----------

   return (
      <>
         <div class='container mt-5 '>
            {' '}
            <button type='button' onClick={ajouter} class='btn btn-primary'>
               Ajouter un Lieu
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
                  <LieuList
                     handleUpdateLieu={handleUpdateLieu}
                     handleDeleteLieuById={handleDeleteLieuById}
                     data={data}
                     setData={setData}
                  />
               </>
            )}
         </div>

         <Modal
            title='Ajouter un Lieu'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: true }}>
            <LieuForm finish={finish} />
         </Modal>
      </>
   );
};

export default LieuPage;
