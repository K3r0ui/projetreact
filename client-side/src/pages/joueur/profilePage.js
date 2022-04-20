import React from 'react'
import { useEffect, useState } from 'react';
import Profile from '../../components/joueur/profile/profile';
import { getProfile } from '../../services/joueur.service';

const ProfilePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getProfile();
            if (result) {
                setData(result);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    return (
        <div className="container mt-5">
            <div className="main-body mt-5">
                {loading && <div> loading ... </div>}
                {!loading &&
                    <Profile profile={data} />
                }
            </div>
        </div>

    )
}

export default ProfilePage;
