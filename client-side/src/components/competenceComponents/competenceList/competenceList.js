
import Competence from '../competence/competence';
const CompetenceList = (props) => {

    const { handleDeleteCompetence, handleUpdateCompetence, data, setData } = props;

    return (<>

        <table className="table mt-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Description</th>
                    <th scope="col">Lien</th>
                    <th scope="col">Video</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((competence) => (
                        <><Competence key={competence._id} competence={competence} deleteCompetence={handleDeleteCompetence} handleUpdateCompetence={handleUpdateCompetence} setData={setData} /></>
                    ))

                }

            </tbody>
        </table>



    </>);
}

export default CompetenceList;