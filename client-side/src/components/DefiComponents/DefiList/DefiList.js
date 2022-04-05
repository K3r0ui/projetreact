import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAllDefis,deleteDefiById } from '../../../services/Defi.service';
import Defi from '../Defi/Defi';
const DefiList = () => {


  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data2 = await getAllDefis();
      if(data2)
      {
        setData(data2);
        console.log(data2)

      }
      
    };
    fetchData();
  }, []);
  
  const deleteDefi = (id) => {
    deleteDefiById(id);
    setData(data.filter(defi=>defi._id !== id)) ;

  }

  

    return ( <>
    <h1>   defilist</h1>
    <div class="container">
    <table class="table">
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
            <><Defi key={defi._id} defi={defi} deleteDefi={deleteDefi}/></>
            ))
            
    }

  </tbody>
</table>
   </div>
    
    
    
    </> );
}
 
export default DefiList ;