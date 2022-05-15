import React, { useEffect, useState } from 'react'
import { Modal, message } from 'antd';
import ProfileForm from './profileForm';
import { updateJoueur, updatePassword } from '../../../services/joueur.service';
import moment from 'moment';
import PasswordForm from './passwordForm';
import StatPartager from './StatPartager';
import CompPartager from './CompPartager';

const Profile = ({ profile, finish, visible, setVisible }) => {
    const [data, setData] = useState(profile);
    const [visiblePassword, setVisiblePassword] = useState(false);

    const editPassword = () => {
        setVisiblePassword(true)
    }
    const edit = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
        setVisiblePassword(false);
    };
    const handleCancel = () => {
        setVisible(false);
        setVisiblePassword(false);
    };


    const finishPasswordUpdate = async (oldPassword, newPassword) => {
        try {
            const response = await updatePassword(oldPassword, newPassword);
            setVisiblePassword(false);
            setData({ data, ...response });
            message.success('Password changer avec succée!');
        } catch (error) {
            console.log(error.message);
            message.error(error.response.data);
        }
    };

    const initialValues = data
        ? {
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob ? moment(data.dob, 'DD/MM/YYYY') : null,
            pob: data.pob,
            sexe: data.sexe,
            job: data.job,
            ville: data.ville,
            telephone: data.telephone,
            taille: data.taille,
            poid: data.poid,
            orientation: data.orientation,
            price: data.price,
            nbscweek: data.nbscweek,
        }
        : {};


    return (
        <>
            {data && (
                <>
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card" style={{ marginTop: '255px' }}>
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4 style={{ textTransform: 'uppercase' }}>{data.firstName} {data.lastName}</h4>
                                            <p className="text-secondary mb-1">{data.email}</p>
                                            <p className="text-muted font-size-sm">{data.ville}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Nom</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.firstName}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Prénom</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.lastName}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Date de naissance</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.dob}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Lieu de naissance</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.pob}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Telephone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.telephone}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Adresse</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.ville}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Genre</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary" style={{ textTransform: 'capitalize' }}>
                                            {data.sexe}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Poste de travil</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.job}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Orientation</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary" style={{ textTransform: 'capitalize' }}>
                                            {data.orientation}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Taille</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.taille} (CM)
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Poid</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {data.poid} (KG)
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">IMC</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {
                                                Math.round(data.poid / ((data.taille / 100) * (data.taille / 100)) * 100) / 100
                                            }
                                        </div>
                                    </div>
                                    <center>
                                        <div className="row mt-4">
                                            <div className="col-sm-12">
                                                <a className="btn btn-info" target="__blank" onClick={edit}>Modifier Profile</a>
                                                &emsp;  &emsp;
                                                <a className="btn btn-info" target="__blank" onClick={editPassword}>Modifier Password</a>
                                            </div>
                                        </div>
                                    </center>
                                </div>
                            </div>

                            <div className="row gutters-sm">
                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <center><h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Statistiques</i></h6></center>
                                            <StatPartager />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <center><h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Competences</i></h6></center>
                                            <CompPartager />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div >


                    <Modal
                        title='Modifier Profile'
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}>
                        {<ProfileForm finish={finish} initialValues={initialValues} />}
                    </Modal>

                    <Modal
                        title='Modifier Password'
                        visible={visiblePassword}
                        onOk={handleOk}
                        onCancel={handleCancel}>
                        {<PasswordForm finishPasswordUpdate={finishPasswordUpdate} />}
                    </Modal>
                </>
            )}

        </>
    )
}

export default Profile;
