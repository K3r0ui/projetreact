import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spin, Space ,Modal,Empty} from 'antd';
import {  useNavigate,} from "react-router-dom";
import { getAllDefis,deleteDefiById, updateDefi, addDefi } from '../../../services/Defi.service';
import Defi from '../Defi/Defi';
import DefiForm from '../DefiForm/DefiForm';
const DefiList = () => {


  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false)
  const [visible, setVisible] = useState(false);

  


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data2 = await getAllDefis();
      if(data2)
      {
        setData(data2);
        console.log(data2)

      }
      console.log(data.length==0);
      setLoading(false)

    };
    fetchData();
  }, []);
  
  //fonction pour la supprission 
  const handleDeleteDefiById = (id) => {
    deleteDefiById(id);
    setData(data.filter(defi=>defi._id !== id)) ;

  }

  // fonction pour fair l'appdate
  const handleUpdateDefi=(id,description,lien)=>{
    
    updateDefi(id,description,lien);
    const newData =data.map((defi) =>{
      if(defi._id === id)
      {
        defi.description=description;
        defi.link=lien;
      } 
        return defi ;
    }
  );
   setData(newData);

  }

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
    
  const finish=async(description,lien)=>{
    
    const response = await addDefi(description,lien);
    setVisible(false);
    console.log(response.status&&response.status==200);
    if( response.status&&response.status==200)
    {
      setData([...data, response.data]);

    }

  }

  //-----------



    return ( <>
    <div class="container mt-5 ">      <button type="button" onClick={ajouter} class="btn btn-primary">Ajouter un défi</button>

      {loading && (<>
      <div class="d-flex justify-content-center">
        <Space size="middle">
         <Spin size="large" />
        </Space>
      </div>    
      </>)
    }
    
    {data.length==0&&(<>
      <Empty />
    </>)}
      {data.length!=0&&(<>
    <table class="table mt-3">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Description</th>
        <th scope="col">Lien</th>
        <th scope="col">Video</th>
        <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    {
        data.map((defi)=>(
            <><Defi key={defi._id} defi={defi} deleteDefi={handleDeleteDefiById} handleUpdateDefi={handleUpdateDefi} setData={setData} /></>
            ))
            
    }

  </tbody>
</table>
</>)
}
   </div>
    






   <Modal
          
          title="Ajouter un defi"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: true }}
        
  >

<DefiForm finish={finish} initialValues={{ lien:'',description:'' }}/>

</Modal>
 
    
    
    </> );
}
 
export default DefiList ;