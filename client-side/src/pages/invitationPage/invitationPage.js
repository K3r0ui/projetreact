import React, { useContext, useEffect, useState } from 'react'
import { Spin, Space, Modal, Empty, message } from 'antd';

import { getAllInviation, addInvitation, deleteInvitation } from '../../services/invitation.service';
import InvitationForm from '../../components/invitationComponents/invitationForm/invitationForm';
import InvitationList from '../../components/invitationComponents/invitationList/invitationList';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserProvider';

const InvitationPage = () => {

    const [data, setData] = useState([]);
    const navig = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const [upgradeModel, setUpgradeModel] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data2 = await getAllInviation();

            if (data2 && data2[0] != null) {
                setData(data2);
            }
            setLoading(false)

        };
        fetchData();
    }, []);


    const handleDeleteInvitation = async (id) => {
        try {
            const res = await deleteInvitation(id);
            console.log("resr", res);
            setData(data.filter((invitation) => invitation._id !== res._id));
            message.success('delete success!');
        } catch (error) {
            console.log(error.message);
            message.error('delete failed!');
        }
    }


    const ajouter = () => {
        if ((currentUser.abonnement.type == "free" && currentUser.abonnement.joueurterminer >= 3) || (currentUser.abonnement.type == "basic" && currentUser.abonnement.joueurterminer >= 10)) {
            setUpgradeModel(true);
        } else {
            setVisible(true);
        }
    }
    const handleOk = () => {
        setVisible(false);
        setUpgradeModel(false);
    }
    const handleCancel = () => {
        setVisible(false);
        setUpgradeModel(false);
    }
    const navigate = () => {
        setUpgradeModel(false);
        navig("/pricing");
    }


    const finish = async (firstName, lastName, email, dob, pob, sexe, job, ville, telephone, price, taille, poid, orientation, nbscweek) => {
        try {

            const response = await addInvitation(firstName, lastName, email, dob, pob, sexe, job, ville, telephone, price, taille, poid, orientation, nbscweek);

            setVisible(false);
            setData([...data, response.data]);
            message.success('Submit success!');
        } catch (error) {
            console.log(error.message);
            message.error('Submit failed!');
        }

    }

    return (
        <>

            <div className="container mt-5 ">      <button type="button" onClick={ajouter} className="btn btn-primary">Inviter Joueur</button>

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

                    <InvitationList handleDeleteInvitation={handleDeleteInvitation} data={data} setData={setData} />

                </>)
                }
            </div>

            <Modal
                title="Inviter Joueur"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: true }}
            >
                <InvitationForm finish={finish} initialValues={{}} />
            </Modal>

            <Modal
                title="Payer Abonnement"
                visible={upgradeModel}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: false }}
            >
                <div>
                    <center><h1> Changer abonnement</h1>
                        <button className="btn btn-primary mt-4" type="button" onClick={navigate}> Payer</button></center>
                </div>
            </Modal>

        </>);
}

export default InvitationPage;