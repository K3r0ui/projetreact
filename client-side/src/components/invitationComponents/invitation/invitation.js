import { useState } from 'react';
import { Popconfirm } from 'antd';



const Invitation = (props) => {
    //destractering
    const { invitation } = props;




    //--fonctions pour confirmer la ssuppression 
    const confirm = async () => await deleteInvitation();


    const deleteInvitation = () => {
        props.deleteInvitation(invitation._id);
    }

    return (<>

        <tr>
            <th scope="row">1</th>
            <td>{invitation.joueur.firstName}</td>
            <td>{invitation.joueur.lastName}</td>
            <td>{invitation.joueur.email}</td>
            <td>{invitation.etat}</td>

            <td>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <Popconfirm
                        title="Title"
                        onConfirm={confirm}
                        onVisibleChange={() => console.log('visible change')}
                    >
                        <button type="button" className="btn btn-danger">supprimer</button>
                    </Popconfirm>
                </div>
            </td>
        </tr>

    </>);
}

export default Invitation;