import { message } from 'antd';
import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import Profile from '../../components/joueur/profile/profile';
import { updateJoueur } from '../../services/joueur.service';
import { UserContext } from '../../UserProvider';

const ProfilePage = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [visible, setVisible] = useState(false);

    const finish = async (values) => {
        try {
            const response = await updateJoueur(values);
            setCurrentUser(response);
            setVisible(false)
            console.log("hit", currentUser);
            message.success('Submit success!');
        } catch (error) {
            console.log(error.message);
            message.error('Submit failed!');
        }
    };

    return (
        <div className="container mt-5">
            <div className="main-body mt-5">
                {currentUser && <Profile profile={currentUser} finish={finish} visible={visible} setVisible={setVisible} />}
            </div>
        </div>

    )
}

export default ProfilePage;
