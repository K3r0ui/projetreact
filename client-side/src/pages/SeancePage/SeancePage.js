import { useEffect, useState } from 'react';
import { Spin, Space ,Modal,Empty,Radio,DatePicker,Select,Table} from 'antd';
import SeanceForm from '../../components/SeanceComponents/SeanceForm/SeanceForm';


const SeancePage = () => {
    const { RangePicker } = DatePicker;
  //  const [data, setData] = useState([]);
    const [loading,setLoading]=useState(false)
    const [visible, setVisible] = useState(false);
    const [size, setSize] = useState('large');
    const [lieux, SetLieux] = useState(['lieu1','lieu2']);
    const [joueurs, SetJoueurs] = useState(['joueur1','joueur2']);


    //fonction for table 





    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          width: 150,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          width: 150,
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
      
      const data2 = [];
      for (let i = 0; i < 100; i++) {
        data2.push({
          key: i,
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`,
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
      };


const onJoueurChange = value => {
    console.log(`selected `,value);
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
  const buttonChange = (e) => {
        setSize( e.target.value );
      };

 const calendarChange = (e) => {
       console.log(e);
      };   


      
      
    return ( <>
       <div class="container mt-5 ">    
         <button type="button" onClick={ajouter} class="btn btn-primary">Ajouter une Seance</button>

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
        <div className='mt-5 mb-5'>
        <center>
        <Radio.Group style={{ width: '40%' }} value={size} onChange={buttonChange}>
           <Radio.Button style={{ width: '50%' }} value="default">toutes les Séances</Radio.Button>

          <Radio.Button style={{ width: '50%' }} value="large"> Séances d'aujourd'huit</Radio.Button>
           

        
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