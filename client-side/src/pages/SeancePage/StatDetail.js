import React, { useEffect, useState } from 'react'
import { Card,  Switch, message } from 'antd';
import { getStatById } from '../../services/stat.service';



export default function StatDetail({s}) {
    const [data, setData] = useState(null);
    
useEffect(() => {
    const fetchData = async () => {
       try {
          const result = await getStatById(s.statistique);
          setData(result);
       } catch (error) {
          console.error(error.response);
          message.error(error.response.data);
       }
    };

    fetchData();
 }, []);

    if(!data) return (<></>)

  return (
    <Card title={data.title} size="small">
                     <p>{data.description}</p>
                     <p>{data.lien}</p>
                     <p>{data.type}</p>
                     <p>{s.valeur} ({data.unite})</p> 
                     <p>à  {data.max} </p>

                     <Switch disabled={true} checked={data.isVisible} />

                  </Card>
  )
}
