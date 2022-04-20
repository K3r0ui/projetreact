import { useState } from 'react';
import { Popconfirm, Modal } from 'antd';
import { Form, Input, message, Button, Space } from 'antd';
import StatForm from '../statForm/statForm';


const Stat = ({ stat, handleUpdateStat, index, deleteStat }) => {
    //destractering
    const [visible, setVisible] = useState(false);

    //fonctions pour formulaire
    const [form] = Form.useForm();


    //faire la mise a jour 
    const finish = (title, description, lien, type, unite) => {
        handleUpdateStat(stat._id, title, description, lien, type, unite);
        setVisible(false);
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    }
    //--fonctions pour confirmer la ssuppression 
    const confirm = async () => await deleteStat(stat._id);

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
                <td>{stat.title}</td>
                <td>{stat.description}</td>
                <td>{stat.type}</td>
                <td>{stat.unite}</td>
                <td>{stat.discipline.description}</td>
                <td>{stat.lien}</td>
                <td> <iframe src={stat.lien} title="YouTube video" allowFullScreen></iframe></td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" onClick={modifier} className="btn btn-secondary">modifier</button>
                        <Popconfirm
                            title="Title"
                            onConfirm={confirm}>
                            <button type="button" className="btn btn-danger">supprimer</button>
                        </Popconfirm>
                    </div>
                </td>
            </tr>

            <Modal
                title="Modifier une statistique"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel} >
                <StatForm forUpdate={true} finish={finish} initialValues={{ title: stat.title, lien: stat.lien, description: stat.description, type: stat.type, unite: stat.unite }} />
            </Modal>


        </>);
}

export default Stat;