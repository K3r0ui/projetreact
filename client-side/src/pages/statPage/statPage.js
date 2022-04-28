import React, { useEffect, useState } from 'react'
import { Spin, Space, Modal, Empty, message } from 'antd';

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


    const handleDeleteStat = async (id) => {
        try {
            const res = await deleteStat(id);
            setData(data.filter((program) => program._id !== res));
            message.success('delete success!');

        } catch (error) {
            console.log(error.message);
            message.error('delete failed!');
        }
    }

    // fonction pour fair l'appdate
    const handleUpdateStat = async (id, values) => {
        try {
            const result = await updateStat(id, values);
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
            const response = await addStat(values);
            setVisible(false);
            setData([response, ...data]);
            message.success('Submit success!');
        } catch (error) {
            console.log(error.message);
            message.error('Submit failed!');
        }
    }

    return (
        <>
            <div className="container mt-5 ">      
            <button type="button" onClick={ajouter} className="btn btn-primary">Ajouter une Statistique</button>

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

                    <StatList handleUpdateStat={handleUpdateStat} handleDeleteStat={handleDeleteStat} data={data}  />

                </>)
                }
            </div>

            <Modal
                title="Ajouter une Statistique"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <StatForm  discipline={discipline} finish={finish} initialValues={{ isVisible: false, alert: false }} />
            </Modal>

        </>);
}

export default StatPage;