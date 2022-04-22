import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
   const navigate = useNavigate();

   const tokenExist = localStorage.getItem('token');
   return (
      <div className='container'>
         <h3> This is the home page</h3>
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
