
import Invitation from '../invitation/invitation';
const InvitationList = (props) => {

    const { handleDeleteInvitation, data, setData } = props;

    return (
    <>
        <table className="table mt-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">firstName</th>
                    <th scope="col">lastName</th>
                    <th scope="col">email</th>
                    <th scope="col">etat</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((invitation, index) => (
                        <><Invitation index={index + 1} key={invitation._id} invitation={invitation} deleteInvitation={handleDeleteInvitation} setData={setData} /></>
                    ))
                }
            </tbody>
        </table>
    </>);
}

export default InvitationList;