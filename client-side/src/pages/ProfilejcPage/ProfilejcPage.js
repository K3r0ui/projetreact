import React from 'react';
import { useEffect, useState } from 'react';
import { Popconfirm, Spin, Space, Modal, Empty } from 'antd';
import ProfilejcForm from '../../components/ProfilejcComponents/ProfilejcForm/ProfilejcForm';
import { getAllPlayersI,getOnePlayer} from '../../services/joueur.service';
import { getSingleSeancePlayer} from '../../services/seance.service';
import { getAllDefis } from '../../services/defi.service';
const ProfilejcPage = () => {
   const [data,setData]=useState([]);
   const [loading, setLoading] = useState(false);
   const [visible, setVisible] = useState(false);
   const [allDefis,setAllDefis]= useState([]);
   const [etatDefi,setEtatDefi]= useState([]);
   const [joueur, setJoueur] = useState([]);
   const [ids, setIds] = useState('');
   const [singleSeance, setSingleSeance ] = useState([]);
   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const data2 = await getAllPlayersI();
         const d3 = await getOnePlayer();

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
                  <th scope='col'>Action</th>
               </tr>
            </thead>
            <tbody>
               {joueur.map((joueur) => (
                  <tr>
                     <th scope='row'>{joueur._id}</th>
                     <td>{joueur.firstName}</td>
                     <td>{joueur.lastName}</td>
                     <td>
                        <div
                           class='btn-group'
                           role='group'
                           aria-label='Basic mixed styles example'>
                           <button
                              type='button'
                              onClick={async() =>             
                                 {setVisible(true);
                                 setIds(joueur._id)
                                 ;console.log("f",ids)
                                 const s =  await getOnePlayer(joueur._id);
                                 const data85 = await getSingleSeancePlayer(joueur._id);
                                 const data95 = await getAllDefis();
                                 
                                  setData(s)
                                  setSingleSeance(data85)
                                  setAllDefis(data95)
                                  const ay = (element)=> {
                                     console.log("element" , element );
                                     let test=false;
                                      element.joueurs.map(e => { {console.log("gggggggggg",e.joueur) ;{if (joueur._id ===e.joueur) {test=true ; } }  ; } } )
                                      console.log("test",test);
                                      return test;
                                    }
                                  const filterdefi = (id1,id2)=>{
                                       if( id1.joueur === joueur._id){
                                          return true;
                                       }
                                     
                                  }
                                  const data101 = await data95.filter(ay);
                                  const data100 = data95.map(x=>x.joueurs.filter(y=> filterdefi(y,joueur._id)));
                                  setEtatDefi(data101);
                                  console.log("alojada",data85);
                                  console.log("FILER 1 ",data95.filter(ay));
                                  console.log("ALO DEFI",data100);
                                 }}
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
            <ProfilejcForm data={data} singleSeance={singleSeance} allDefis={allDefis} etatDefi={etatDefi}/>
         </Modal>
      </>
   );
};

export default ProfilejcPage;
