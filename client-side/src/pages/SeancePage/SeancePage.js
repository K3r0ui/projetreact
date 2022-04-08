import { useEffect, useState } from 'react';
import { Spin, Space ,Modal,Empty} from 'antd';
import SeanceForm from '../../components/SeanceComponents/SeanceForm/SeanceForm';


const SeancePage = () => {
    const [data, setData] = useState([]);
    const [loading,setLoading]=useState(false)
    const [visible, setVisible] = useState(false);




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
    
  const finish=async(name,description,etat)=>{
    
      setVisible(false);
      //const response = await addEvent(name,description,etat);
   /* console.log(response.status&&response.status==200);
    if( response.status&&response.status==200)
    {
      setData([...data, response.data]);

    }*/

  }
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
    </div>   


    <Modal
    
    title="Ajouter une séance"
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    width={1200}
    okButtonProps={{ disabled: true }}
  
>

    <SeanceForm finish={finish} />

    </Modal>
    
       
    
    </> );
}
 
export default SeancePage;