import React from 'react'
import { useEffect, useState } from 'react';
import { Spin, Space ,Modal,Empty} from 'antd';
import DefiPlayerList from '../../components/DefiPlayerComponents/DefiPlayerList';
import {getAllDefisJ } from '../../services/defi.service'
import DefiPlayerForm from '../../components/DefiPlayerComponents/DefiPlayerForm';
import { makeDoneJoeur } from '../../services/joueur.service';
function DefiPagePlayer() {
    useEffect(() => {
        const fetchData = async ()=>{
          const data = await getAllDefisJ();
          console.log("dataaaa",data.data);
           if(data){
               setData(data.data);
           }
           setLoading(false)
        };
      fetchData();
    }, [])
    const [data,setData] = useState([])
    const [loading,setLoading]=useState(false)
    const [visible, setVisible] = useState(false);
    
    const handleMakeDoneJoeurById = (id) => {
      const doneJ = true;
      makeDoneJoeur(id,doneJ);
      // setData(data.filter(defi=>defi._id !== id)) ;
  
    }
    const handleOk = () => {
        setVisible(false);
     };
     const handleCancel = () => {
        setVisible(false);
     };
  return (<>
   
    {loading && (<>
    <div class="d-flex justify-content-center">
      <Space size="middle">
       <Spin size="large" />
      </Space>
    </div>    
    </>)
    }
    
    {data.length==0 &&!loading&& (<>
    <Empty />
    </>)}
    {data.length!=0 &&!loading &&(<>
    
    <DefiPlayerList data={data} handleMakeDoneJoeurById={handleMakeDoneJoeurById} />
    
    </>)
    }
    
    
      
        </>  );
}

export default DefiPagePlayer;