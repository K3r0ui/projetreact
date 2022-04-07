import React from 'react'
import { useEffect, useState } from 'react';
import { Spin, Space ,Modal,Empty} from 'antd';
import EventForm from '../../components/EventComponents/EventForm/EventForm';
import EventList from '../../components/EventComponents/EventList/EventList';
import { deleteEventById, updateEvent,addEvent,getAllEvents } from '../../services/event.service';
const EventsPage = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data2 = await getAllEvents();
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
  const handleDeleteEventById = (id) => {
    deleteEventById(id);
    setData(data.filter(event=>event._id !== id)) ;

  }

  // fonction pour fair l'appdate
  const handleUpdateEvent=(id,name,description,etat)=>{
    
    updateEvent(id,name,description,etat);
    const newData =data.map((event) =>{
      if(event._id === id)
      {
        event.name=name;
        event.description=description;
        event.etat=etat;
      } 
        return event ;
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
    
  const finish=async(name,description,etat)=>{
    
    const response = await addEvent(name,description,etat);
    setVisible(false);
    console.log(response.status&&response.status==200);
    if( response.status&&response.status==200)
    {
      setData([...data, response.data]);

    }

  }

  //-----------

return ( <>
    
    
    <div class="container mt-5 ">      <button type="button" onClick={ajouter} class="btn btn-primary">Ajouter un evennement</button>

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
{data.length!=0 &&!loading &&(<>
<EventList handleUpdateEvent={handleUpdateEvent} handleDeleteEventById={handleDeleteEventById}  data={data} setData={setData} />
</>)
}
</div>







<Modal
    
    title="Ajouter un evennement"
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    okButtonProps={{ disabled: true }}
  
>

<EventForm finish={finish} />

</Modal>

    
    
    
    
    </>);
}
 
export default EventsPage;