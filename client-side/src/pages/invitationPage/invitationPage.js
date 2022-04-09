import React, { useEffect, useState } from 'react'
import { Spin, Space, Modal, Empty } from 'antd';

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


    const handleDeleteInvitation = (id) => {
        deleteInvitation(id);
        setData(data.filter(invitation => invitation._id !== id));
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
        const response = await addInvitation(firstName, lastName, email, dob, pob, sexe, job, ville, telephone, price, taille, poid, orientation, nbscweek);
        setVisible(false);
        console.log(response.status && response.status == 200);
        if (response.status && response.status == 200) {
            setData([...data, response.data]);

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