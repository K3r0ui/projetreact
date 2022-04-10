import { useState } from 'react';
import { Popconfirm, Modal } from 'antd';
import { Form, Input, message, Button, Space } from 'antd';
import CompetenceForm from '../competenceForm/competenceForm';


const Competence = (props) => {
    //destractering
    const { competence, handleUpdateCompetence } = props;
    const [visible, setVisible] = useState(false);

    //fonctions pour formulaire
    const [form] = Form.useForm();


    //faire la mise a jour 
    const finish = (title, description, lien) => {

        handleUpdateCompetence(competence._id, title, description, lien);

        setVisible(false);
        console.log('Received values of form: ', values);

    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    }
    //--fonctions pour confirmer la ssuppression 
    const confirm = async () => await deleteCompetence();


    const deleteCompetence = () => {

        props.deleteCompetence(competence._id);

    }

    // fonction pour popup  
    const modifier = () => {
        setVisible(true);

    }
    const handleOk = () => {
        setVisible(false);
    }
    const handleCancel = () => {
        setVisible(false);
    }

    return (<>

        <tr>
            <th scope="row">1</th>
            <td>{competence.title}</td>
            <td>{competence.description}</td>
            <td>{competence.link}</td>
            <td> <iframe src={competence.link} title="YouTube video" allowFullScreen></iframe></td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" onClick={modifier} className="btn btn-secondary">modifier</button>
                    <Popconfirm
                        title="Title"
                        onConfirm={confirm}
                        onVisibleChange={() => console.log('visible change')}
                    >
                        <button type="button" className="btn btn-danger">supprimer</button>
                    </Popconfirm>
                </div>
            </td>
        </tr>

        <Modal
            title="Modifier une Competence"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: true }}

        >
            <CompetenceForm finish={finish} initialValues={{ title: competence.title, lien: competence.link, description: competence.description }} />
        </Modal>


    </>);
}

export default Competence;