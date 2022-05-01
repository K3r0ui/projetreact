import { Form, Input,Card,Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getAllSeances } from '../../../services/seance.service';
import 'antd/dist/antd.css';

const ProfilejcForm = ({data,singleSeance,allDefis,etatDefi}) => {
   const [seances, setSeances] = useState([]);

   
   useEffect(() => {
      const fetchData = async()=> {
      const data2 = await getAllSeances();
      if ( data2)
      
      setSeances(data2);
         console.log('defi',data2)     
      //    const dataTable = [];
      //    data2.map(x=>  {if( data._id === x.joueur._id) {}
      //    let resultFormat =formatStatComp(x.competences,x.statistiques)
      //    dataTable.push(x.titre,resultFormat.chStat,resultFormat.chComp)
      // });setDataa(dataTable);
   };fetchData();}, []);
   const [form] = Form.useForm();
   const onFinish = () => {

      form.resetFields();
      message.success('Submit success!');
   };
 
   const onFinishFailed = () => {
     message.error('Submit failed!');
   };

   return (
      <div class='container mt-5'>
         <Form
            
            form={form}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item>
               <Typography>
                <pre> Nom de la famille: {data.lastName}</pre>
                </Typography>
                <Typography>
                <pre> Prenom: {data.firstName}</pre>
                </Typography>
                <Typography>
                <pre> Adresse Email: {data.email}</pre>
                </Typography>
                <Typography>
                <pre> Date de naissance: {data.dob}</pre>
                </Typography>
                <Typography>
                <pre> Poids: {data.poid}</pre>
                </Typography>
                <Typography>
                <pre> Taille: {data.taille}</pre>
                </Typography>
                <Typography>
                <pre> Nombre de seances prevu par semaine: {data.nbscweek}</pre>
                </Typography>
                {/* {
                   allDefis.map((x , index) => <>
                   <Typography>
                      <pre> Description: {x.description}</pre>
                      <pre>Defi Index({index+1}){x.joueurs.map(y => filterdefi(y,data._id)  )}</pre>
                      
                   </Typography>
                   </>)
                } */}
                
                {/* {
                   etatDefi.map(y=>y.map(x=><><Typography>
                     <pre> {x.delai}</pre>
                     </Typography></>))
                } */}

                {
                   etatDefi.map((y , index)=> <><Card style={{ width: 300 }}><Typography>
                     <pre> Nom de la defi ({index+1}):{y.description}</pre>
                     </Typography>{y.joueurs.map((z,index) => (z.joueur === data._id)? <><Typography>
                     <pre> Date({index+1}) :{z.delai.slice(0, 10)}</pre>
                     <pre> Done({index+1}) :{(z.donejoueur === true)?"Defi done" : "Defi not done"}</pre>
                     </Typography></> : "")}</Card></>
                     
                     
                     )
                     
                }
                
                {singleSeance.map((x , index) => <>
                  <Card style={{ width: 300 }}>
                <Typography>
                <pre> Nom de la seance({index+1}): {x.titre}</pre>
                </Typography>
                <Typography>
                <pre> Etat de la seance: {x.etat}</pre>
                </Typography>
                {x.competences.map((y, index) =>  <> 

                <Card style={{ width: 300 }}>
                <Typography>
                <pre> Nom de la competance({index+1}): {y.title}</pre>
                </Typography>
                <Typography>
                <pre> nombre de stars: {y.stars}</pre>
                </Typography>
                </Card>
                </> )}
                
                {x.statistiques.map((z, index) =>   <> 
                 
                <Card style={{ width: 300 }}>
                <Typography><pre> Nom du statistique({index+1}):{z.statistique.title}</pre></Typography>
                <Typography>
                <pre> valeur: {z.valeur}</pre>
                </Typography>
                </Card>
                </> )}
                </Card> </>
                 

                  )}

                                

               

            </Form.Item>
         </Form>
      </div>
   );
};
export default ProfilejcForm;

