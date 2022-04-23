import { Row, Col,Form, Input, message, Button, Space,Select,DatePicker, TimePicker } from 'antd';
import { useEffect, useState } from 'react';
import { getAllCompetence } from '../../../services/competence.service';
import { getAllPrograms } from '../../../services/programSeance.service';
import { getAllLieus } from '../../../services/lieu.service';
import { getAllStat } from '../../../services/stat.service';
import { getAllPlayers } from '../../../services/joueur.service';
import { addSeance } from '../../../services/seance.service';

const SeanceForm = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [programmes, setProgrammes] = useState(['programme1','programme2']);
    const [lieux, setLieux] = useState(['lieu1','lieu2']);
    const [joueurs, setJoueurs] = useState(['joueur1','joueur2']);
    const [competances,setCompetances]=useState([])
    const [statistiques,setStatistiques]=useState([])


  
    useEffect(() => {
      const fetchData = async () => {
          const resultComp = await getAllCompetence();
          if (resultComp) {
              setCompetances(resultComp);
              console.log('resultComp',resultComp);
          }
          const resultStat = await getAllStat();
          if (resultStat) {
              setStatistiques(resultStat);
              console.log('resultStat',resultStat)
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
          const resultProg = await getAllPrograms();
          if (resultProg) {
              setProgrammes(resultProg);
              console.log('resultProg',resultProg)
          }
         
      };
      fetchData();
  }, []); 
    
    

    

    // onsubmit 
    const onFinish = (values) => {
      console.log(Object.entries(values.statistiquesList));
      form.resetFields();
      console.log(values);
      let stats =Object.entries(values.statistiquesList);
      let stat=[];
      stats.map((statistique)=>{
        let statVal={
          statistique:statistique[0],
          valeur:statistique[1]
          
        }
        stat.push(statVal);
      })
      console.log(values.date.format("YYYY-MM-DD h:mm:ss"))
      //(titre,joueur,lieu,program,date,competences ,statistiques)
      

           addSeance(values.name,values.joueur,values.lieu,values.programme,values.date.format("YYYY-MM-DD h:mm:ss"),values.competencess,stat)
           console.log("new stats",stat)

        //props.finish(values.description,values.lien);
        message.success('Submit success!');


     };

     //submit failed 
    const onFinishFailed = () => {
        message.error('Submit failed!');
      }; 
      const { Option } = Select;

    

      //lorsque select competance change
      function handleChangeStatistique(value) {
       
        setData(value);
        console.log(`selected stat `,value);
      }  

      function handleChangeCompetance(value) {
       
      console.log(`selected `,value);
    } 

    
    const onProgrammeChange = value => {
        console.log(`selected `,value);
      };
    
      const onLieuChange = value => {
        console.log(`selected `,value);
          };


    const onJoueurChange = value => {
        console.log(`selected `,value);
    };     





    return (
    <>
    <div class="container mt-5">
<Form
    initialValues={props.initialValues}
    form={form}
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    >
    <Form.Item
          name="name"
          label="Nom de l'évènnement"
          rules={[
            {
              required: true,
              message: 'Entrer un nom'
            },
           
            {
              type: 'string',
              min: 6,
            },
          ]}
        >
          <Input placeholder="Nom de l'évènnement" />
        </Form.Item>

   <Form.Item 
   name="date"
   rules={[{ required: true, message: 'choisir la date de la séance' }]} 
   label="Date et Heure de la séance ">
        <DatePicker showTime placeholder='selectionner une date' style={{ width: '50%' }}/>
    </Form.Item>



   <Form.Item 
   label="Competances" 
   name="competencess"
   rules={[{ required: true, message: 'choisir des compétances' }]}   >     
        <Select
        mode="multiple"
        allowClear
        
        style={{ width: '100%' }}
        placeholder="Selectionner les statistiques"
        onChange={handleChangeCompetance}
        >
             {competances.map(competance => (
          <Option key={competance._id}>{competance.title}</Option>
        ))}
        </Select>
    </Form.Item>

   
   
   <Form.Item 
   name="statistiques"
   rules={[{ required: true, message: 'choisir des statistiques' }]}   
   label="Statistiques" > 
        <Select
        mode="multiple"
        allowClear
        labelInValue={true}
        
        style={{ width: '100%' }}
        placeholder="Selectionner les statistiques"
        onChange={handleChangeStatistique}
        >
        {
          statistiques.map(statistique=>(
            <Option key={statistique._id}>{statistique.title}</Option>

          ))
        }
        </Select>
    </Form.Item>   


    


        <Row gutter={16}>
        
            {data.map(field => (
                <>
            <Col className="gutter-row" span={4}>
            
                <Form.Item
                name={['statistiquesList', field.key]}
                label={field.label}
            
                rules={[{ required: true, message: 'Street is required' }]}
            >
                <Input style={{ width: '50%' }} placeholder="Input street" />
            </Form.Item>
            
            </Col>
            <br/>
            </>
            ))}

        </Row>
    <div className='container'>  
    <Form.Item
    name="joueur"
     >   
        
        <Select  placeholder="Selectionner un joueur" style={{ width: '80%' }} onChange={onJoueurChange}>
        {joueurs.map(joueur => (
          <Option key={joueur._id}>{joueur.lastName+" "+joueur.firstName}</Option>
        ))}


        </Select>

    
   

    </Form.Item>   
    <Row>
    <Col span={12}>

    <Form.Item
     name="programme"
     >   
        
        <Select name="programme" placeholder="Selectionner un programme" style={{ width: "80%" }} onChange={onProgrammeChange}>
        {programmes.map(programme => (
          <Option key={programme._id}>{programme.name}</Option>
        ))}


        </Select>
        </Form.Item>


      </Col>  
      <Col span={12}>

        <Form.Item
        name="lieu">  
        <Select  name="lieu"  placeholder="Selectionner le lieu" style={{ width: "80%"}}  onChange={onLieuChange}>
            {lieux.map(lieu => (
            <Option key={lieu._id}>{lieu.name}</Option>
            ))}
        </Select>
        </Form.Item>
        </Col>  
      
    </Row>         
    </div>             
  
    <Form.Item>

        <center>
        <Space>
        
          <Button type="primary" class="btn btn-primary" htmlType="submit">
            Submit
          </Button>
          
        </Space>
        </center>
    </Form.Item>
      
</Form>
</div>
    
    </>  );
}
 
export default SeanceForm;