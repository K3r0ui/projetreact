import React, { useEffect, useState } from 'react'
import { Spin, Space, Modal, Empty } from 'antd';

import { getAllStat, addStat, updateStat, deleteStat } from '../../services/stat.service';
import { getAllDiscipline } from '../../services/discipline.service';
import StatForm from '../../components/statComponents/statForm/statForm';
import StatList from '../../components/statComponents/statList/statList';

const StatPage = () => {

    const [data, setData] = useState([]);
    const [discipline, setDescipline] = useState([]);
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data2 = await getAllStat();
            if (data2) {
                setData(data2);
            }

            const des = await getAllDiscipline();
            if (des) {
                setDescipline(des);
            }
            setLoading(false)

        };
        fetchData();
    }, []);


    const handleDeleteStat = (id) => {
        deleteStat(id);
        setData(data.filter(stat => stat._id !== id));

    }

    // fonction pour fair l'appdate
    const handleUpdateStat = (id, title, description, lien, type, unite) => {

        updateStat(id, title, description, lien, type, unite);
        const newData = data.map((stat) => {
            if (stat._id === id) {
                stat.title = title;
                stat.description = description;
                stat.lien = lien;
                stat.type = type;
                stat.unite = unite
            }
            return stat;
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


    const finish = async (title, description, lien, type, unite, discipline) => {

        const response = await addStat(title, description, lien, type, unite, discipline);
        setVisible(false);
        console.log(response.status && response.status == 200);
        if (response.status && response.status == 200) {
            setData([...data, response.data]);
        }

    }

    return (
        <>

            <div className="container mt-5 ">      <button type="button" onClick={ajouter} className="btn btn-primary">Ajouter une Statistique</button>

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

                    <StatList handleUpdateStat={handleUpdateStat} handleDeleteStat={handleDeleteStat} data={data} setData={setData} />

                </>)
                }
            </div>




            <Modal

                title="Ajouter une Statistique"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: true }}

            >

                <StatForm forUpdate={false} discipline={discipline} finish={finish} initialValues={{ title: '', lien: '', description: '' }} />

            </Modal>

        </>);
}

export default StatPage;