import React from 'react'
import { useEffect, useState } from 'react';
import ProfileCoach from '../../components/Coach/ProfileCoach/ProfileCoach';
import { getCurrentCoachProfile } from '../../services/profile.service';
import moment from 'moment';
const ProfileCoachPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getCurrentCoachProfile();
            console.log("profile",result)
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
                    <ProfileCoach profilecoach={data} />
                }
            </div>
        </div>

    )
}

export default ProfileCoachPage;
