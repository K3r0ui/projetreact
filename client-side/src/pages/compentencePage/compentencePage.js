import React, { useEffect, useState } from 'react'
import { Spin, Space, Modal, Empty } from 'antd';

import { getAllCompetence, addCompetence, updateCompetnece, deleteCompetence } from '../../services/competence.service';
import CompetenceForm from '../../components/competenceComponents/competenceForm/competenceForm';
import CompetenceList from '../../components/competenceComponents/competenceList/competenceList';

const CompentencePage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data2 = await getAllCompetence();

            if (data2) {
                setData(data2);
            }
            setLoading(false)

        };
        fetchData();
    }, []);


    const handleDeleteCompetence = (id) => {
        deleteCompetence(id);
        setData(data.filter(competence => competence._id !== id));

    }

    // fonction pour fair l'appdate
    const handleUpdateCompetence = (id, title, description, lien) => {

        updateCompetnece(id, title, description, lien);
        const newData = data.map((competence) => {
            if (competence._id === id) {
                competence.title = title;
                competence.description = description;
                competence.link = lien;
            }
            return competence;
        }
        );
        setData(newData);

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


    const finish = async (title, description, lien) => {

        const response = await addCompetence(title, description, lien);
        setVisible(false);
        console.log(response.status && response.status == 200);
        if (response.status && response.status == 200) {
            setData([...data, response.data]);

        }

    }

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

                    <CompetenceList handleUpdateCompetence={handleUpdateCompetence} handleDeleteCompetence={handleDeleteCompetence} data={data} setData={setData} />

                </>)
                }
            </div>




            <Modal

                title="Ajouter une Competence"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: true }}

            >

                <CompetenceForm finish={finish} initialValues={{ title: '', lien: '', description: '' }} />

            </Modal>

        </>);
}

export default CompentencePage;