import { Popconfirm ,Modal} from "antd"
import { useState } from "react"
const EventJoueur = (props) => {
    const {event} = props
    const [isModalVisible,setIsModalVisible]=useState(false)
    
    
   const popVisible=()=>{
    setIsModalVisible(true);

   }


   const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    const participer =()=>{

    }
    const interesser =()=>{
        
    }
    return (<>
    <tr>
      <th scope="row">1</th>
      <td>{event.name}</td>
      <td>{event.description}</td>
      <td> </td>

      <td>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" onClick={popVisible} class="btn btn-secondary">Consulter</button>
          <Popconfirm
            title="Title"
            onConfirm={participer}
            onVisibleChange={() => console.log('visible change')}
          >
            <button type="button"  class="btn btn-danger">Participer</button>
            </Popconfirm>
            <Popconfirm
            title="Title"
            onConfirm={interesser}
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
        <h5>Participants :</h5><p></p>
        <h5>Etat : {event.etat}</h5>
              </Modal>
    </>);
}
 
export default EventJoueur;