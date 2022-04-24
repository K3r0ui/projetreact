import { useEffect, useState } from 'react';
import { Spin, Space ,Modal,Empty,Radio,DatePicker,Select,Table,Button} from 'antd';
import SeanceForm from '../../components/SeanceComponents/SeanceForm/SeanceForm';
import moment from "moment";
import { getAllSeances } from '../../services/seance.service';
import { getAllLieus } from '../../services/lieu.service';
import { getAllPlayers } from '../../services/joueur.service';
import { addSeance } from '../../services/seance.service';
import { useNavigate } from 'react-router-dom';



const SeancePage = () => {
    const { RangePicker } = DatePicker;
    const navigate = useNavigate();

    const [loading,setLoading]=useState(false)
    const [visible, setVisible] = useState(false);
    const [size, setSize] = useState('all');
    const [lieux, setLieux] = useState([]);
    const [joueurs, setJoueurs] = useState([]);
    const [seances, setSeances] = useState([]);
    const [data,setData]=useState([]);
    const [allData,setAllData]=useState([]);


    let dateNow = moment().format("YYYY-MM-DD")


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
     const annulerSeance=(id)=>{
       console.log('id seance',id);

     }
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        const data2 = await getAllSeances();
        if(data2)
        {
          setSeances(data2);
          console.log('seances',data2)     
          const dataTable = [];
          data2.map((seance,index)=>{


            let resultFormat =formatStatComp(seance.competences,seance.statistiques)
            
          

            dataTable.push(

                {
                    key:index,
                    titre:seance.titre,
                    date:seance.date,
                    lieu:seance.lieu.name,
                    joueur:seance.joueur.firstName+" "+seance.joueur.lastName,
                    etat:seance.etat,
                    programme:seance.program.name,
                    competences:resultFormat.chComp,
                    statistiques:resultFormat.chStat,
                    Action:<>
                            <Button onClick={()=>annulerSeance(seance._id)} style={{ width: "80%"}} type="primary">Annuler</Button>
                            <Button  style={{ width: "80%"}} type="danger">Feedback</Button> 
                              </>

                  
                }

            )

          })
         console.log(dataTable);

        setData(dataTable);
        setAllData(dataTable)
  
        }
        const resultJoueur = await getAllPlayers();
        if (resultJoueur) {
            setJoueurs(resultJoueur);
            console.log('resultJoueur',resultJoueur)
        }
        const resultLieu = await getAllLieus();
        if (resultLieu) {
            setLieux(resultLieu);
            console.log('resultLieu',resultLieu)
        }
        setLoading(false)
  
      };
      fetchData();
    }, []);
    





    //fonction for table 





    const columns = [
        {
          title: 'Nom de seance',
          dataIndex: 'titre',
          width: 150,
        },
        {
          title: 'Etat',
          dataIndex: 'etat',
          width: 150,
        },
        {
          title: 'Lieu',
          dataIndex: 'lieu',
          width: 150,
        },
        {
          title: 'Date',
          dataIndex: 'date',
          width: 150,
        },
        {
          title: 'Joueur',
          dataIndex: 'joueur',
          width: 150,
        },
        {
          title: 'Programme',
          dataIndex: 'programme',
          width: 150,
        },
      
        {
          title: 'Competences',
          dataIndex: 'competences',
          width: 300,
        },
        {
          title: 'Statistiques',
          dataIndex: 'statistiques',
          width: 300,
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          width: 150,
        },
       
      ];
      
      const data2 = [];
     /* for (let i = 0; i < 100; i++) {
        data2.push({
          key: i,
          nom: `Seance ${i}`,
          date: '2022-03-25',
          lieu: `lieu${i}`,
          joueur: `joueur${i}`,

          statistiques:"['stat1','stat2']",
          competances:"['comp1','competance2']"
        });
        
      }
      for (let i = 0; i < 5; i++) {
        data2.push({
          key: i+100,
          nom: `Seance ${i}`,
          date: dateNow,
          lieu: `lieu${i}`,
          joueur: `joueur${i}`,

          statistiques:"['stat1','stat2']",
          competances:"['comp1','competance2']"
        });
        
      }
    const [data, setData] = useState(data2);*/

//-------------------------------------------      

      //-------------fonction pour poupup-----

  const ajouter =()=>{
    setVisible(true);

  }

  const handleOk=()=>{
    setVisible(false);
  }
  const handleCancel=()=>{
    setVisible(false);
  }
  const onLieuChange = value => {
    console.log(`selected `,value);
    const dataChange=  allData.filter(seance => seance.lieu ===value )
    setSize('any')
   
     setData(dataChange);

      };


const onJoueurChange = value => {
  setSize('any')
  const dataChange=  allData.filter(seance => seance.joueur ===value )
   
  setData(dataChange);
};     
    
  const finish=async(name,joueur,lieu,programme,date,competences,stat)=>{

    
      setVisible(false);
      const seance =await addSeance(name,joueur,lieu,programme,date,competences,stat)
     
      console.log(seance);
      if (seance.status && seance.status===200)
      {
        let resultFormat =formatStatComp(seance.data.competences,seance.data.statistiques)
        const newSeance={
          key:5666,
          titre:seance.data.titre,
          date:seance.data.date,
          lieu:seance.data.lieu.name,
          joueur:seance.data.joueur.firstName+" "+seance.data.joueur.lastName,
          etat:seance.data.etat,
          programme:seance.data.program.name,
          competences:resultFormat.chComp,
          statistiques:resultFormat.chStat


        }
        const newData=[...allData, newSeance]
         setAllData(newData);
         setData(newData);
       
         
      }
     // navigate("/seances");

    
  }
  //bouton tous les seance et seance aujourd'huit
  const buttonChange = (e) => {
        if(e.target.value==="all")
        {
          setData(allData);
        }
        else
        {
          const dateDay=(element)=>{
            const date =element.date.substring(0, 10);
            return  moment(date).isSame(dateNow) 
      
          }
           
           const dataChange=  allData.filter(dateDay)
           console.log("data now ",dataChange);
           
         
          setData(dataChange);
        }
        setSize( e.target.value );
        console.log( e.target.value)
      };

 const calendarChange = (e) => {
  setSize('any')

   if(e && e[0]&&e[1])
   {
   // const a = moment('2022-05-2').isBetween(e[0], e[1]);
    
    const datBetween=(element)=>{
      const date =element.date.substring(0, 10);
      return moment(date).isBetween(e[0], e[1])

    }
    const dataChange=  allData.filter(datBetween )

         
    setData(dataChange);
    console.log("data",data);
   }
  //range = moment().range(startDate, endDate);
//console.log(e[0]);
       };   


      
      
    return ( <>
       <div class="container mt-5 ">    
         <button type="button" onClick={ajouter} class="btn btn-primary">Ajouter une Seance</button>

        <div className='mt-5 mb-5'>
        <center>
        <Radio.Group style={{ width: '40%' }} value={size} onChange={buttonChange}>
           <Radio.Button style={{ width: '50%' }} value="all">toutes les Séances</Radio.Button>

          <Radio.Button style={{ width: '50%' }} value="now"> Séances d'aujourd'huit</Radio.Button>
           

        
        </Radio.Group>
       

    <RangePicker  onCalendarChange={calendarChange} style={{ width: '20%' }} showTime />
    <Select  placeholder="Selectionner un joueur" style={{ width: '20%' }} onChange={onJoueurChange}>
        {joueurs.map(joueur => (
          <Option key={joueur.firstName+" "+joueur.lastName}>{joueur.firstName}</Option>
        ))}


    </Select>
    <Select   placeholder="Selectionner le lieu" style={{ width: "20%"}}  onChange={onLieuChange}>
            {lieux.map(lieu => (
              <Option key={lieu.name}>{lieu.name}</Option>
              ))}
        </Select>


        </center>
        </div>
              {loading && (<>
              <div class="d-flex justify-content-center">
              <Space size="middle">
              <Spin size="large" />
              </Space>
              </div>    
              </>)
              }
      
              {data.length==0 &&!loading &&(<>
             
              
              <Empty />
              </>)}
        {!data.length==0 &&!loading &&(<>
        <Table className="mt-5" columns={columns} dataSource={data} pagination={{ pageSize: 30 }} scroll={{ y:600}} />,
        
        </>)}


        
    </div>   

     
    
    <Modal
    
    title="Ajouter une séance"
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    width={1000}
    okButtonProps={{ disabled: true }}
  
>

    <SeanceForm finish={finish} joueurs={joueurs} lieux={lieux}/>

    </Modal>
    
       
    
    </> );
}
 
export default SeancePage;