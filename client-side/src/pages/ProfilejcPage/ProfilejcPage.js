import React from 'react';
import { useEffect, useState } from 'react';
import { Popconfirm, Spin, Space, Modal, Empty } from 'antd';
import ProfilejcForm from '../../components/ProfilejcComponents/ProfilejcForm/ProfilejcForm';
import { getAllJoueurs } from '../../services/profile.service';
const ProfilejcPage = () => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [visible, setVisible] = useState(false);
   const [joueur, setJoueur] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const data2 = await getAllJoueurs();

         if (data2) {
            setJoueur(data2);
            console.log("joeur",data2);
         }
         setLoading(false);
      };
      fetchData();
   }, []);

   //fonction pour la supprission

   // fonction pour fair l'appdate
   //-------------fonction pour poupup-----
   const modifier = () => {
      setVisible(true);
   };
   const ajouter = () => {
      setVisible(true);
   };

   const handleOk = () => {
      setVisible(false);
   };
   const handleCancel = () => {
      setVisible(false);
   };

   //-----------
   const formatStatComp=(competences,statistiques)=>{
      let chComp="";
      
      competences.map((competence , index)=>{
        chComp+="["+index+" : "+competence.title+"]  "
      });
      let chStat="";
     statistiques.map((statistique , index)=>{
        chStat+="["+statistique.statistique.title+ " : "+statistique.valeur+"]  "
      });
      return {
        chComp:chComp,
        chStat:chStat
        
      }
      
    }
    
   return (
      <>
         <table class='table mt-3'>
            <thead>
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>FirstName</th>
                  <th scope='col'>LastName</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>job</th>
                  <th scope='col'>orientation</th>
                  <th scope='col'>competences</th>
                  <th scope='col'>statistiques</th>
                  <th scope='col'>Action</th>
               </tr>
            </thead>
            <tbody>
               {joueur.map((joueur) => (
                  <tr>
                     <th scope='row'>1</th>
                     <td>{joueur.firstName}</td>
                     <td>{joueur.lastName}</td>
                     <td>{joueur.email}</td>
                     <td>{joueur.job}</td>
                     <td>{joueur.orientation}</td>
                     <td>{joueur.competences.map(x => {
                        x._id
                     })}</td>
                     <td>{joueur.statistiques}</td>
                     <td>
                        <div
                           class='btn-group'
                           role='group'
                           aria-label='Basic mixed styles example'>
                           <button
                              type='button'
                              onClick={modifier}
                              class='btn btn-secondary'>
                              Afficher profile
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div class='container mt-5 '>
            {' '}
            {loading && (
               <>
                  <div class='d-flex justify-content-center'>
                     <Space size='middle'>
                        <Spin size='large' />
                     </Space>
                  </div>
               </>
            )}
         </div>

         <Modal
            title='Profile'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: true }}>
            <ProfilejcForm />
         </Modal>
      </>
   );
};

export default ProfilejcPage;
