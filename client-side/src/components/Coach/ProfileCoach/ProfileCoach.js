import {React,  useState, useEffect } from 'react'
import { Button, Label,Typography } from 'antd'
import ProfileCoachForm from './ProfileCoachForm';
import PasswordCoachForm from './PasswordCoachForm';
import { Modal, message } from 'antd';
import moment from 'moment';
import { updateCoach , updatePasswordCoach} from '../../../services/profile.service';
export default function ProfileCoach({profilecoach}) {
  const [data,setData] = useState(profilecoach);
  useEffect(() => {
    return () => {
      setData(profilecoach);
    };
  }, []);
  // variable state pour show more infos
  const [butt, setButt] = useState(false)
  // variable state pour buttons
  const [visible, setVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleParametre, setVisibleParametre] = useState(false);
  const editParametre = () => {
    setVisibleParametre(true);
  }
  const editPassword = () => {
    setVisiblePassword(true)
    console.log("GG")
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
// modifier profile coach
const finish = async (values) => {
  try {
    const rs = await updateCoach(values)
    console.log(profilecoach);
    console.log("aaa",{data,...rs});
    
    setVisible(false);
    setData({data,...rs});
    message.success('Submit success!');
  } catch (error) {
    console.log(error.message);
    message.error('Submit failed!');
  }
}
// modifier mot de passe coach
const finishPasswordUpdate = async (oldPassword,newPassword)=>{
  console.log('HIT')
  try {
    console.log('HITss')
    const rs = await updatePasswordCoach(oldPassword,newPassword)
    console.log('rs',rs)
    setVisiblePassword(false);
    setData({data,...rs});
    message.success('Password avec success!');
  } catch (error) {
    message.error('Verifier Votre Mot de passe')
  }
}
// calcul age
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

const initialValues = data
        ? {
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob ? moment(data.dob, 'YYYY-MM-DD') : null }: {};
  return (<>
    <h1> Profile du coach :  {data.firstName+" "+data.lastName}</h1>
    <label>Nom de la famille:</label>
    <Typography>
    <pre>{data.firstName}</pre>
    </Typography>
    <label>Prénom</label>
    <Typography>
    <pre>{data.lastName}</pre>
    </Typography>
    <label>Adresse Email:</label>
    <Typography>
    <pre>{data.email}</pre>
    </Typography>
    <label>Age</label>
    <Typography>
    <pre>{getAge(data.dob)} Ans</pre>
    </Typography>
    { butt=== true ?
    <>
    <label>Type d'abonnement</label>     
    <Typography>
    <pre>{data.abonnement.type}</pre>
    </Typography>
    <label>Nombre De joueurs</label>     
    <Typography>
    <pre>{data.abonnement.joueurterminer}</pre>
    </Typography>
    <label>Date de creation d'abonnement</label>     
    <Typography>
    <pre>{data.abonnement.doc.slice(0,10)}</pre>
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
                {<ProfileCoachForm  initialValues={initialValues} finish={finish} />}
    </Modal>
    <Modal
                title='Modifier Password'
                visible={visiblePassword}
                onOk={handleOk}
                onCancel={handleCancel}>
                {<PasswordCoachForm finishPasswordUpdate={finishPasswordUpdate}/>}
    </Modal>
    </>
    
    
    )
    
          
    
    
}
