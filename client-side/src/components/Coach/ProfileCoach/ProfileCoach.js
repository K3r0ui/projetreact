import {React,  useState } from 'react'
import { Button, Label,Typography } from 'antd'
import ProfileCoachForm from './ProfileCoachForm';
import PasswordCoachForm from './PasswordCoachForm';
import { Modal, message } from 'antd';
import moment from 'moment';
export default function ProfileCoach({profilecoach}) {
  const objecttoarray =(gg)=>{
    let vv = Object.values(gg) ;
    console.log("GG",vv)
     return vv;
  }
  const [butt, setButt] = useState(false)
  const [visible, setVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleParametre, setVisibleParametre] = useState(false);
  const editParametre = () => {
    setVisibleParametre(true);
  }
  const editPassword = () => {
    setVisiblePassword(true)
}
  const edit = () => {
    setVisible(true);
};

const handleOk = () => {
  setVisible(false);
  setVisiblePassword(false);
  setVisibleParametre(false);
};
const handleCancel = () => {
  setVisible(false);
  setVisiblePassword(false);
  setVisibleParametre(false);
};
const initialValues = profilecoach
        ? {
            firstName: profilecoach.firstName,
            lastName: profilecoach.lastName,
            dob: profilecoach.dob ? moment(profilecoach.dob, 'YYYY-MM-DD') : null }: {};
  return (<>
    <h1> Profile du coach :  {profilecoach.firstName+" "+profilecoach.lastName}</h1>
    <label>Nom de la famille:</label>
    <Typography>
    <pre>{profilecoach.firstName}</pre>
    </Typography>
    <label>Prénom</label>
    <Typography>
    <pre>{profilecoach.lastName}</pre>
    </Typography>
    <label>Adresse Email:</label>
    <Typography>
    <pre>{profilecoach.email}</pre>
    </Typography>
    <label>Date de naissance</label>
    <Typography>
    <pre>{profilecoach.dob.slice(0,10)}</pre>
    </Typography>
    { butt=== true ?
    <>
    <label>Type d'abonnement</label>     
    <Typography>
    <pre>{profilecoach.abonnement.type}</pre>
    </Typography>
    <label>Nombre De joueurs</label>     
    <Typography>
    <pre>{profilecoach.abonnement.joueurterminer}</pre>
    </Typography>
    <label>Date de creation d'abonnement</label>     
    <Typography>
    <pre>{profilecoach.abonnement.doc.slice(0,10)}</pre>
    </Typography> </>: <Button onClick={()=>{ setButt(true); }}>More info</Button>}
    <br></br>
    <br></br>
    <Button style={{ width: 350 , align: "left"  }} type="primary" onClick={edit} >Modifier Profile </Button>
    <span>  </span>
    <Button style={{ width: 350 , align: "center" }} type="primary" onClick={editPassword} >Modifier Mot de passe </Button>
    <span>  </span>
    <Button style={{ width: 350 , align: "right" }} type="primary" onClick={editParametre}>Modifier paramétre </Button>



    <Modal
                title='Modifier Profile'
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                {<ProfileCoachForm  initialValues={initialValues} />}
    </Modal>
    <Modal
                title='Modifier Password'
                visible={visiblePassword}
                onOk={handleOk}
                onCancel={handleCancel}>
                {<PasswordCoachForm />}
    </Modal>
    </>
    
    
    )
    
          
    
    
}
