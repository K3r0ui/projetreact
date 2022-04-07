import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spin, Space } from 'antd';
import { Link } from 'react-router-dom';
import { getAllDefis,deleteDefiById, updateDefi, addDefi } from '../../../services/Defi.service';
import Defi from '../Defi/Defi';
const DefiList = () => {


  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false)
  


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
  
  const handleDeleteDefiById = (id) => {
    deleteDefiById(id);
    setData(data.filter(defi=>defi._id !== id)) ;

  }
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

  



    return ( <>
    <div class="container mt-5 ">
      <Link class="btn btn-primary" role="button" aria-pressed="true" to="/defis/insert">ajouter un defi</Link>
      <button type="button" onClick={ajouter} class="btn btn-danger">add</button>

      {loading && (<>
      <div class="d-flex justify-content-center">
        <Space size="middle">
         <Spin size="large" />
        </Space>
      </div>    
      </>)
    }
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
   </div>
    
    
    
    </> );
}
 
export default DefiList ;