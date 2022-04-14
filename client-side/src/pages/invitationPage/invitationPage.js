import React, { useEffect, useState } from 'react'
import { Spin, Space, Modal, Empty, message } from 'antd';

import { getAllInviation, addInvitation, deleteInvitation } from '../../services/invitation.service';
import InvitationForm from '../../components/invitationComponents/invitationForm/invitationForm';
import InvitationList from '../../components/invitationComponents/invitationList/invitationList';

const InvitationPage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false);

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
        setVisible(true);

    }
    const handleOk = () => {
        setVisible(false);
    }
    const handleCancel = () => {
        setVisible(false);
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

                <InvitationForm finish={finish} initialValues={{
                    firstName: '', lastName: '', email: '', dob: '', pob: '', sexe: '', job: '', ville: '', telephone: '', price: "",
                    taille: "", poid: "", orientation: '', nbscweek: ''
                }} />

            </Modal>

        </>);
}

export default InvitationPage;