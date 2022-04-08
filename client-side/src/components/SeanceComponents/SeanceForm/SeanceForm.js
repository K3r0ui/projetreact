import { Row, Col,Form, Input, message, Button, Space,Select,DatePicker, TimePicker } from 'antd';
import { useEffect, useState } from 'react';

const SeanceForm = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [programmes, setProgrammes] = useState(['programme1','programme2']);
    const [lieux, SetLieux] = useState(['lieu1','lieu2']);
    const [joueurs, SetJoueurs] = useState(['joueur1','joueur2']);

    
    
    

    

    // onsubmit 
    const onFinish = (values) => {
           console.log(values.statistiques);
           form.resetFields();

        //props.finish(values.description,values.lien);
        message.success('Submit success!');


     };

     //submit failed 
    const onFinishFailed = () => {
        message.error('Submit failed!');
      }; 
      const { Option } = Select;

      const listStatistiques = [];
      for (let i = 10; i < 36; i++) {
        listStatistiques.push(<Option  key={"statistique"+i.toString(36) + i}>{"statistique"+i.toString(36) + i}</Option>);
      }


      const listCompetances = [];
      for (let i = 10; i < 36; i++) {
        listCompetances.push(<Option  key={"competance"+i.toString(36) + i}>{"competance"+i.toString(36) + i}</Option>);
      }
      

      //lorsque select competance change
      function handleChangeStatistique(value) {
          setData(value);
        console.log(`selected `,value);
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
        {listCompetances}
        </Select>
    </Form.Item>

   
   
   <Form.Item 
   name="statistiques"
   rules={[{ required: true, message: 'choisir des statistiques' }]}   
   label="Statistiques" > 
        <Select
        mode="multiple"
        allowClear
        
        style={{ width: '100%' }}
        placeholder="Selectionner les statistiques"
        onChange={handleChangeStatistique}
        >
        {listStatistiques}
        </Select>
    </Form.Item>   


    


        <Row gutter={16}>
        
            {data.map(field => (
                <>
            <Col className="gutter-row" span={4}>
            
                <Form.Item
                name={['statistiques', field]}
                label={field}
            
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
     >   
        
        <Select  placeholder="Selectionner un joueur" style={{ width: '80%' }} onChange={onJoueurChange}>
        {joueurs.map(joueur => (
          <Option key={joueur}>{joueur}</Option>
        ))}


        </Select>

    
   

    </Form.Item>   
    <Form.Item
     >   
        
        <Select  placeholder="Selectionner un programme" style={{ width: 500 }} onChange={onProgrammeChange}>
        {programmes.map(programme => (
          <Option key={programme}>{programme}</Option>
        ))}


        </Select>

        <Select   placeholder="Selectionner le lieu" style={{ width: 500}}  onChange={onLieuChange}>
            {lieux.map(lieu => (
            <Option key={lieu}>{lieu}</Option>
            ))}
        </Select>
   

    </Form.Item>            
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