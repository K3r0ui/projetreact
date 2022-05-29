import React from 'react'
import { useEffect, useState } from 'react';
import { Spin, Space ,Modal,Empty} from 'antd';
import { getAllDefis ,deleteDefiById, updateDefi, addDefi,assignerDefi } from '../../services/defi.service';

import DefiList from '../../components/DefiComponents/DefiList/DefiList';
import DefiForm from '../../components/DefiComponents/DefiForm/DefiForm';
import AssignedForm from '../../components/DefiComponents/AssignedForm/AssignedForm';
const DefiPage = () => {
  const [data, setData] = useState();
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
  // fct pour assigner un défi 
  const handleAssignerDefi=(id,joueur,delai)=>{
    assignerDefi(id,joueur,delai);
    


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



    

    return (<>
<div class="container mt-5 ">      <button type="button" onClick={ajouter} class="btn btn-primary">Ajouter un défi</button>
{loading && (<>
<div class="d-flex justify-content-center">
  <Space size="middle">
   <Spin size="large" />
  </Space>
</div>    
</>)
}

{loading&& (<>
<Empty />
</>)}
{data &&!loading &&(<>

<DefiList handleUpdateDefi={handleUpdateDefi} handleDeleteDefiById={handleDeleteDefiById} handleAssignerDefi={handleAssignerDefi} data={data} setData={setData} />

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

  
    </>  );
}
 
export default DefiPage;