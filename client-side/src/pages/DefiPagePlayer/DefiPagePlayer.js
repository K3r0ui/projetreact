import React from 'react'
import { useEffect, useState } from 'react';
import { Spin, Space ,Modal,Empty} from 'antd';
import DefiPlayerList from '../../components/DefiPlayerComponents/DefiPlayerList';
import {getAllDefisJ } from '../../services/defi.service'
import DefiPlayerForm from '../../components/DefiPlayerComponents/DefiPlayerForm';
function DefiPagePlayer() {
    useEffect(() => {
        const fetchData = async ()=>{
          const data = await getAllDefisJ();
          console.log(data);
           if(data){
               setData(data);
           }
           setLoading(false)
        };
      fetchData();
    }, [])
    const [data,setData] = useState([])
    const [loading,setLoading]=useState(false)
    const [visible, setVisible] = useState(false);


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
    
    <DefiPlayerList  />
    
    </>)
    }
    
    
    
    
    
    
    
    
    <Modal
        
        title="Mettre done un defi"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: true }}
      
    >
    
    <DefiPlayerForm />
    
    </Modal>
    
      
        </>  );
}

export default DefiPagePlayer;