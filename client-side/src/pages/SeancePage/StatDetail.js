import React, { useEffect, useState } from 'react';
import { Card, Switch, message } from 'antd';
import { getStatById } from '../../services/stat.service';

export default function StatDetail({ s, isJ }) {
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

   if (!data || (isJ && !data.isVisible)) return <></>;

   return (
      <Card title={data.title} size='small'>
         <p>{data.description}</p>
         <a href={data.lien} target={'_blank'}>
            {data.lien}
         </a>
         <p>{data.type}</p>
         <p>
            {s.valeur} ({data.unite})
         </p>
         <p>à {data.max} </p>

         {!isJ && <Switch disabled={true} checked={data.isVisible} />}
      </Card>
   );
}
