import { useEffect, useState } from 'react';
import { Spin, Space ,Modal,Empty,Radio,DatePicker,Select,Table} from 'antd';
import SeanceForm from '../../components/SeanceComponents/SeanceForm/SeanceForm';
import moment from "moment";
import { getAllSeances } from '../../services/seance.service';


const SeancePage = () => {
    const { RangePicker } = DatePicker;

    const [loading,setLoading]=useState(false)
    const [visible, setVisible] = useState(false);
    const [size, setSize] = useState('all');
    const [lieux, SetLieux] = useState([]);
    const [joueurs, SetJoueurs] = useState([]);
    const [seances, setSeances] = useState([]);


    let dateNow = moment().format("YYYY-MM-DD")



    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        const data2 = await getAllSeances();
        if(data2)
        {
          setSeances(data2);
          console.log('seances',data2)
  
        }
        setLoading(false)
  
      };
      fetchData();
    }, []);
    





    //fonction for table 





    const columns = [
        {
          title: 'Nom de seance',
          dataIndex: 'nom',
          width: 150,
        },
        {
          title: 'Date de seance',
          dataIndex: 'date',
          width: 150,
        },
        {
          title: 'Lieu',
          dataIndex: 'lieu',
          width: 150,
        },
        {
          title: 'Joueur',
          dataIndex: 'joueur',
          width: 150,
        },
        {
          title: 'Statistiques',
          dataIndex: 'statistiques',
          width: 200,
        },
        {
          title: 'Competances',
          dataIndex: 'competances',
          width: 200,
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          width: 150,
        },
       
      ];
      
      const data2 = [];
      for (let i = 0; i < 100; i++) {
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
      const [data, setData] = useState(data2);

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
    const dataChange=  data2.filter(seance => seance.lieu ===value )
    setSize('any')
   
     setData(dataChange);

      };


const onJoueurChange = value => {
  setSize('any')
  const dataChange=  data2.filter(seance => seance.joueur ===value )
   
  setData(dataChange);
};     
    
  const finish=async(name,description,etat)=>{
    
      setVisible(false);
      //const response = await addEvent(name,description,etat);
   /* console.log(response.status&&response.status==200);
    if( response.status&&response.status==200)
    {
      setData([...data, response.data]);

    }*/
    
  }
  //bouton tous les seance et seance aujourd'huit
  const buttonChange = (e) => {
        if(e.target.value==="all")
        {
          setData(data2);
        }
        else
        {
         
           
           const dataChange=  data2.filter(seance =>   moment(seance.date).isSame(dateNow) )

         
          setData(dataChange);
        }
        setSize( e.target.value );
        console.log( e.target.value)
      };

 const calendarChange = (e) => {
  setSize('any')

   if(e && e[0]&&e[1])
   {
    const a = moment('2022-05-2').isBetween(e[0], e[1]);
    const dataChange=  data2.filter(seance =>   moment(seance.date).isBetween(e[0], e[1]) )

         
    setData(dataChange);
    console.log(a);
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
          <Option key={joueur}>{joueur}</Option>
        ))}


    </Select>
    <Select   placeholder="Selectionner le lieu" style={{ width: "20%"}}  onChange={onLieuChange}>
            {lieux.map(lieu => (
              <Option key={lieu}>{lieu}</Option>
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
        <Table className="mt-5" columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y:600}} />,
        
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

    <SeanceForm finish={finish} />

    </Modal>
    
       
    
    </> );
}
 
export default SeancePage;