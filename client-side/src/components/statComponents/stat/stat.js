import { useState } from 'react';
import { Popconfirm, Modal, Switch } from 'antd';
import StatForm from '../statForm/statForm';


const Stat = ({ stat, handleUpdateStat, index, deleteStat }) => {
    //destractering
    const [visible, setVisible] = useState(false);

    //faire la mise a jour 
    const finish = (values) => {
        handleUpdateStat(stat._id, values);
        setVisible(false);
    };

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
                <td ><div style={{ "marginLeft": "15%" }}>{stat.max}</div></td>
                <td><Switch disabled={true} checked={stat.isVisible} /></td>
                <td><Switch disabled={true} checked={stat.alert} /></td>
                <td> <a href={stat.lien} target="_blank">{stat.lien}</a></td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" onClick={modifier} className="btn btn-secondary mx-2">modifier</button>
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
                <StatForm forUpdate={true} finish={finish} initialValues={stat} />
            </Modal>


        </>);
}

export default Stat;