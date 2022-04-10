import React from 'react'
import { useEffect, useState } from 'react';
import { Spin, Space ,Empty,Radio} from 'antd';
import EventsListJoueur from '../../components/EventComponents/EventsListJoueur/EventsListJoueur';
import { getPrivateEvents,getPublicEvents } from '../../services/event.service';

const EventsJoueurPage = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false)
  const [eventsType, setEventsType] = useState('public');
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
     setData3(await getPrivateEvents());
     setData2(await getPublicEvents());
     setData(await getPublicEvents());
     
      setLoading(false)

    };
    fetchData();
  }, []);


  const buttonChange = (e) => {
    if(e.target.value==="public")
    {
      setData(data2);
    }
    else
    {
     
       setData(data3)

     
    }
    setEventsType( e.target.value );
    console.log( e.target.value)
  };
 
    return ( <>
    
    <div class="container mt-5 ">      
        <div className='mt-5 mb-5'>
            <center>
                <Radio.Group style={{ width: '40%' }} value={eventsType} onChange={buttonChange}>
                <Radio.Button style={{ width: '50%' }} value="public">Evennements publi</Radio.Button>

                <Radio.Button style={{ width: '50%' }} value="privé"> Evennements privés</Radio.Button>
                

                
                </Radio.Group>
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
        {data.length!=0 &&!loading &&(<>
        <EventsListJoueur   data={data} setData={setData} />
        </>)
        }
    </div>
        
        
    </> );
}
 
export default EventsJoueurPage;