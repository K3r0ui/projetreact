
import Defi from '../Defi/Defi';
const DefiList = (props) => {

const {handleDeleteDefiById,handleUpdateDefi,data,setData} = props;
  
    return ( <>
    
    <table class="table mt-3">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Description</th>
        <th scope="col">Lien</th>
        <th scope="col">Video</th>
        <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    {
        data.map((defi)=>(
            <><Defi key={defi._id} defi={defi} deleteDefi={handleDeleteDefiById} handleUpdateDefi={handleUpdateDefi} setData={setData} /></>
            ))
            
    }

  </tbody>
</table>

    






 
 
    
    
    </> );
}
 
export default DefiList ;