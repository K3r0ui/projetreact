import { useState } from 'react';
import { Popconfirm, Modal } from 'antd';
import { Rate, Switch } from 'antd';
import CompetenceForm from '../competenceForm/competenceForm';


const Competence = ({ competence, handleUpdateCompetence, index, deleteCompetence }) => {
    //destractering
    const [visible, setVisible] = useState(false);

    //faire la mise a jour 
    const finish = (values) => {
        handleUpdateCompetence(competence._id, values);
        setVisible(false);
    };

    //--fonctions pour confirmer la ssuppression 
    const confirm = async () => await deleteCompetence(competence._id);

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

    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{competence.title}</td>
                <td>{competence.description}</td>
                <td><Rate disabled value={competence.stars} /></td>
                <td><Switch disabled={true} checked={competence.isVisible} /></td>
                <td><a href={competence.link} target="_blank">{competence.link}</a></td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" onClick={modifier} className="btn btn-secondary mx-2">modifier</button>
                        <Popconfirm
                            title="Title"
                            onConfirm={confirm}>
                            <button type="button" className="btn btn-danger ">supprimer</button>
                        </Popconfirm>
                    </div>
                </td>
            </tr>

            <Modal
                title="Modifier une Competence"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <CompetenceForm finish={finish} initialValues={competence} />
            </Modal>

        </>);
}

export default Competence;