import Lieu from '../Lieu/Lieu';
const LieuList = (props) => {
   const { handleDeleteLieuById, handleUpdateLieu, data, setData } = props;

   return (
      <>
         <table class='table mt-3'>
            <thead>
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Nom du lieu</th>
                  <th scope='col'>City</th>
                  <th scope='col'>Country</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Action</th>
               </tr>
            </thead>
            <tbody>
               {data.map((lieu) => (
                  <>
                     <Lieu
                        key={lieu._id}
                        lieu={lieu}
                        handleDeleteLieuById={handleDeleteLieuById}
                        handleUpdateLieu={handleUpdateLieu}
                        setData={setData}
                     />
                  </>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default LieuList;
