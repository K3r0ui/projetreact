
import Stat from '../stat/stat';
const StatList = ({ handleDeleteStat, handleUpdateStat, data, setData }) => {
    return (
        <>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">unite</th>
                        <th scope="col">discipline</th>
                        <th scope="col">Lien</th>
                        <th scope="col">Video</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((stat, index) => (
                            <><Stat key={stat._id} index={index} stat={stat} deleteStat={handleDeleteStat} handleUpdateStat={handleUpdateStat} setData={setData} /></>
                        ))

                    }

                </tbody>
            </table>
        </>
    );
}

export default StatList;