
import Competence from '../competence/competence';
const CompetenceList = ({ handleDeleteCompetence, handleUpdateCompetence, data }) => {

    return (
        <>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope='col'>Note</th>
                        <th scope='col'>Visible</th>
                        <th scope="col">Lien</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((competence, index) => (
                            <><Competence key={competence._id} index={index} competence={competence} deleteCompetence={handleDeleteCompetence} handleUpdateCompetence={handleUpdateCompetence} /></>
                        ))

                    }

                </tbody>
            </table>
        </>);
};

export default CompetenceList;