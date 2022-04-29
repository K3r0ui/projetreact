import React, { useEffect, useState } from 'react'
import { Spin, Space, Modal, Empty, message } from 'antd';

import { getAllCompetence, addCompetence, updateCompetnece, deleteCompetence } from '../../services/competence.service';
import CompetenceForm from '../../components/competenceComponents/competenceForm/competenceForm';
import CompetenceList from '../../components/competenceComponents/competenceList/competenceList';

const CompentencePage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllCompetence();
            if (result) {
                setData(result);
            }
            setLoading(false);
        };
        fetchData();
    }, []);


    const handleDeleteCompetence = async (id) => {
        try {
            const res = await deleteCompetence(id);
            setData(data.filter(competence => competence._id !== res));
            message.success('delete success!');
        } catch (error) {
            console.log(error.message);
            message.error('delete failed!');
        }
    };

    // fonction pour fair l'appdate
    const handleUpdateCompetence = async (id, values) => {
        try {
            const result = await updateCompetnece(id, values);
            const clonedData = [...data];
            const index = clonedData.findIndex((el) => el._id === result._id);
            clonedData[index] = result;
            setData(clonedData);
            message.success('update success!');
        } catch (error) {
            console.log(error.message);
            message.error('update failed!');
        }
    }

    const ajouter = () => {
        setVisible(true);
    }
    const handleOk = () => {
        setVisible(false);
    }
    const handleCancel = () => {
        setVisible(false);
    }

    const finish = async (values) => {
        try {
            const response = await addCompetence(values);
            setVisible(false);
            setData([response, ...data]);
            message.success('Submit success!');
        } catch (error) {
            console.log(error.message);
            message.error('Submit failed!');
        }
    };

    return (
        <>
            <div className="container mt-5 ">      <button type="button" onClick={ajouter} className="btn btn-primary">Ajouter une Compentence</button>
                {loading && (<>
                    <div className="d-flex justify-content-center">
                        <Space size="middle">
                            <Spin size="large" />
                        </Space>
                    </div>
                </>)
                }
                {data.length == 0 && !loading && (<>
                    <Empty />
                </>)}
                {data.length != 0 && !loading && (<>

                    <CompetenceList handleUpdateCompetence={handleUpdateCompetence} handleDeleteCompetence={handleDeleteCompetence} data={data} />

                </>)
                }
            </div>

            <Modal
                title="Ajouter une Competence"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <CompetenceForm finish={finish} initialValues={{ isVisible: false }} />
            </Modal>

        </>);
}

export default CompentencePage;