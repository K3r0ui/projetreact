
import Stat from '../stat/stat';
const StatList = ({ handleDeleteStat, handleUpdateStat, data }) => {
    return (
        <>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Unite</th>
                        <th scope="col">Maximiser Ou Maximiser</th>
                        <th scope="col">Visible</th>
                        <th scope="col">Alert</th>
                        <th scope="col">Lien</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((stat, index) => (
                            <><Stat key={stat._id} index={index} stat={stat} deleteStat={handleDeleteStat} handleUpdateStat={handleUpdateStat} /></>
                        ))

                    }

                </tbody>
            </table>
        </>
    );
}

export default StatList;