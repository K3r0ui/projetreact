import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllAlert } from '../../services/alert.service';
import { Alert } from 'antd';
import { useEffect, useState } from 'react';
const HomePage = () => {
   const navigate = useNavigate();
   useEffect(() => {
      const fetchData = async()=>{
          const data = await getAllAlert();
          console.log("GG",data);
          if (data){
              setData(data);
          }
      };
      fetchData();
  }, [])
  const [data, setData] = useState([])
   const tokenExist = localStorage.getItem('token');
   return (
      <div className='container'>
         <h3> This is the home page</h3>  
         { data.map(x=> <><Alert message={x.name} type={x.type} closable  />
         </> )}
        
         {!tokenExist && (
            <>
               <Button onClick={() => navigate('/login')}>
                  login as coach
               </Button>
               <Button onClick={() => navigate('/loginJoueur')}>
                  login as joueur
               </Button>
            </>
         )}
      </div>
   );
};

export default HomePage;
