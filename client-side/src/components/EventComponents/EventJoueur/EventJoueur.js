import { Popconfirm ,Modal,message} from "antd"
import { useState,useContext,useEffect } from "react"
import { UserContext } from "../../../UserProvider"
import { joinEvent } from "../../../services/event.service"
const EventJoueur = (props) => {
    const {event} = props
    const [isModalVisible,setIsModalVisible]=useState(false)
    const { currentUser } = useContext(UserContext);
    const [status,setStatus] = useState("")
    const [partcipPlayers,setPartcipPlayers]= useState("")
    const [interestedPlayers,setInterestedPlayers]=useState("")




    useEffect(() => {
      const getStatus = async () => {
        const eventUser=event.joueurs.find(joueur=>joueur.joueur._id===currentUser._id)
        if (eventUser&& eventUser.status)
        {
          
          setStatus(eventUser.status)
        }
        else
        {
          setStatus("");
        }

          let partPlayers= "";
          let intPlayers="";
          event.joueurs.map((joueur)=>{
            if (joueur.status==="participer")
            {
              partPlayers+=joueur.joueur.firstName+" "+joueur.joueur.lastName+" | "
            }
            else if(joueur.status==="interessé")
            {
              intPlayers+=joueur.joueur.firstName+" "+joueur.joueur.lastName+" | "

            }
          })
          setPartcipPlayers(partPlayers);
          setInterestedPlayers(intPlayers);
          console.log("eventUser",eventUser)
          console.log("ev",event);


  
      };
      getStatus();
    }, [event]);
    
   const popVisible=()=>{
    setIsModalVisible(true);

   }


   const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    const participer =async(statusUpdated)=>{
      if(status==="")
      {

        console.log("user",currentUser);
        const res=  await joinEvent(event._id,statusUpdated);
        if(res && res.status===200)
        {
          setStatus(statusUpdated);
          message.success('vous avez bien répondu !');

        }
        else{
          message.error('un erreur est produit!');

        }
       
      
      }
      else {
        message.error('vous avez déjà répondu !!');
      }

    }

    const joueurs=(etat)=>{
      return etat
    }
   
  
    return (<>
    <tr>
      <th scope="row">1</th>
      <td>{event.name}</td>
      <td>{event.description}</td>
      <td> {status}</td>

      <td>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" onClick={popVisible} class="btn btn-secondary">Consulter</button>




               
          <Popconfirm
            title="participer?"
            onConfirm={()=>participer("participer")}
            onVisibleChange={() => console.log('visible change')}
          >
            <button type="button"  class="btn btn-danger">Participer</button>
            </Popconfirm>
            <Popconfirm
            title="ne pas participer ?"
            onConfirm={()=>participer("ne pas participer")}
            onVisibleChange={() => console.log('visible change')}
          >
            <button type="button"  class="btn btn-primary">Ne pas participer</button>
            </Popconfirm>
            <Popconfirm
            title="Interessé"
            onConfirm={()=>participer("interessé")}
            onVisibleChange={() => console.log('visible change')}
          >
            <button type="button"  class="btn btn-danger">Interessé</button>
         </Popconfirm>
        </div>
      </td>
    </tr>





    <Modal title={event.name}
     visible={isModalVisible}
      onOk={handleOk}
       onCancel={handleCancel}
    width={700}>
        <center><h4>Nom de l'evennement : {event.name}</h4></center>
        <h5>Description : {event.description}</h5>
        {
          event.coach&&
        <h5>Coach : {event.coach.firstName+" "+event.coach.lastName}</h5>
        }


        <h5>Participants :</h5><p>{partcipPlayers}</p>


        <h5> Joueur Interessés :</h5><p>{interestedPlayers}</p>

        <h5>Etat : {event.etat}</h5>
              </Modal>
    </>);
}
 
export default EventJoueur;