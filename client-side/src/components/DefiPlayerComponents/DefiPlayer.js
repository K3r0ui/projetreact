import { useContext ,useState } from 'react';
import {  Popconfirm,Modal } from 'antd';
import { Form} from 'antd';
import { UserContext } from '../../UserProvider';
import { makeDoneJoeur } from '../../services/joueur.service';
const DefiPlayer = (props) => {
     //destractering
    const {defi} =props;
    const [visible, setVisible] = useState(false);
    const [visibleAss, setVisibleAss] = useState(false);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    //fonctions pour formulaire
    const [form] = Form.useForm();
    let  j= defi.joueurs.filter((e)=>(e.joueur == currentUser._id))
    const confirm = () =>
    new Promise(resolve => {
      setTimeout(() => resolve(), 2000);
      makeDoneJoeur();   
      
    });
    const makeDoneJoeur =()=>{
       
       props.makeDoneJoeur(defi._id);
       window.location="/joueur/defi"

    }
    return (<>

<tr>
      <th scope="row">1</th>
      <td>{defi.description}</td>
      <td>{defi.link}</td>
      <td> <iframe src={defi.link} title="YouTube video" allowfullscreen></iframe></td>
        {!j[0].donejoueur && <td>false</td> }
        {j[0].donejoueur && <td>true</td> }
      {!j[0].donejoueur?
      <td>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        
    
        
          <Popconfirm
            title="Title"
            onConfirm={confirm}
            onVisibleChange={() => console.log('visible change')}
          >
            <button type="button"  class="btn btn-danger">Done</button>
            </Popconfirm>
        </div>
      </td>:<>✅</>}
    </tr>  
        </>  );
}
 
export default DefiPlayer;