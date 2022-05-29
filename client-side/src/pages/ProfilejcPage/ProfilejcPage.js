import React from 'react';
import { useEffect, useState } from 'react';
import { Popconfirm, Spin, Space, Modal, Empty, message } from 'antd';
import ProfilejcForm from '../../components/ProfilejcComponents/ProfilejcForm/ProfilejcForm';
import { getAllPlayersI, getOnePlayer } from '../../services/joueur.service';
import { getSingleSeancePlayer } from '../../services/seance.service';
import { getAllDefis } from '../../services/defi.service';
import ModifierJProfile from '../../components/ProfilejcComponents/ProfilejcForm/ModifierJProfile';
import { updateProfilJoueur } from '../../services/profile.service';
const ProfilejcPage = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [visible, setVisible] = useState(false);
   const [allDefis, setAllDefis] = useState([]);
   const [etatDefi, setEtatDefi] = useState([]);
   const [joueur, setJoueur] = useState([]);
   const [ids, setIds] = useState(null);
   const [singleSeance, setSingleSeance] = useState([]);
   const [modifierVisible, setModifierVisible] = useState(false)
   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const data2 = await getAllPlayersI();
         const d3 = await getOnePlayer();

         if (data2) {
            setJoueur(data2);
            console.log("joeur", data2);

         }

         setLoading(false);
      };
      fetchData();
   }, []);

   //fonction pour la supprission

   // fonction pour fair l'appdate
   //-------------fonction pour poupup-----
   const modifier = async (id) => {
      setModifierVisible(true);
      setIds(id)

   };

   const handleOk = () => {
      setVisible(false);
      setModifierVisible(false);

   };
   const handleCancel = () => {
      setVisible(false);
      setModifierVisible(false);
   };


   //-----------
   const formatStatComp = (competences, statistiques) => {
      let chComp = "";

      competences.map((competence, index) => {
         chComp += "[" + index + " : " + competence.title + "]  "
      });
      let chStat = "";
      statistiques.map((statistique, index) => {
         chStat += "[" + statistique.statistique.title + " : " + statistique.valeur + "]  "
      });
      return {
         chComp: chComp,
         chStat: chStat

      }

   }


   //modiifier Profil 
   const finish = async (id, values) => {
      try {
         const result = await updateProfilJoueur(id, values)
         const clonedData = [...joueur];
         const index = clonedData.findIndex((el) => el._id === result._id);
         clonedData[index] = result;
         setJoueur(clonedData);
         message.success('update success!');
         setModifierVisible(false)
      } catch (error) {
         console.log(error.message);
         message.error('update failed!');
      }

   }
 if (joueur.length != 0)
   return (
      <div className='container'>
         <table class='table mt-3'>
            <thead>
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>FirstName</th>
                  <th scope='col'>LastName</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Action</th>
               </tr>
            </thead>
            <tbody>
               {joueur.map((joueur, index) => (
                  <>
                     <tr>
                        <th scope='row'>{index + 1}</th>
                        <td>{joueur.firstName}</td>
                        <td>{joueur.lastName}</td>
                        <td>{joueur.email}</td>
                        <td>
                           <div
                              class='btn-group'
                              role='group'
                              aria-label='Basic mixed styles example'>
                              <button
                                 type='button'
                                 onClick={async () => {
                                    setVisible(true);
                                    setIds(joueur._id)
                                       ; console.log("f", ids)
                                    const s = await getOnePlayer(joueur._id);
                                    const data85 = await getSingleSeancePlayer(joueur._id);
                                    const data95 = await getAllDefis();

                                    setData(s)
                                    setSingleSeance(data85)
                                    setAllDefis(data95)
                                    const ay = (element) => {
                                       let test = false;
                                       element.joueurs.map(e => { { { if (joueur._id === e.joueur) { test = true; } }; } })
                                       return test;
                                    }
                                    const filterdefi = (id1, id2) => {
                                       if (id1.joueur === joueur._id) {
                                          return true;
                                       }

                                    }
                                    const data101 = await data95.filter(ay);
                                    const data100 = data95.map(x => x.joueurs.filter(y => filterdefi(y, joueur._id)));
                                    setEtatDefi(data101);
                                 }}
                                 class='btn btn-secondary'>
                                 Afficher profile
                              </button>
                              <button
                                 type='button'
                                 onClick={async () => {

                                    setData(joueur)
                                    setModifierVisible(true)

                                 }}
                                 style={{ marginLeft: "20px" }}
                                 class='btn btn-success'>
                                 modifier profile
                              </button>
                           </div>
                        </td>
                     </tr>



                  </>

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
            {data && <ProfilejcForm data={data} singleSeance={singleSeance} allDefis={allDefis} etatDefi={etatDefi} />}
         </Modal>



         {/* model modifier profil */}
         <Modal
            title='Modifier Profile'
            visible={modifierVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
         >
            <ModifierJProfile initialValues={data} finish={finish} />
         </Modal>


      </div>
   );
   else if(joueur.length == 0)
   return(
   <>
   <Empty />
</>)
};

export default ProfilejcPage;
