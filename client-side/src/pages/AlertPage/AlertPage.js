import React from 'react'
import { getAllAlert } from '../../services/alert.service';

import { useEffect, useState } from 'react';
function AlertPage() {
    useEffect(() => {
        const fetchData = async()=>{
            const data = await getAllAlert();
            console.log("GG",data);
            if (data){
                setData(data);
            }
        }
        fetchData();
    }, [])
    const [data, setData] = useState([])
  return (
    <div>AlertPage</div>
  )
}

export default AlertPage