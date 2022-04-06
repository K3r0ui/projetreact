import axios from 'axios';
import { useEffect, useState } from 'react';
const Defi = (props) => {

    const [data, setData] = useState();
    const deleteDefi =()=>{
       
       props.deleteDefi(props.defi._id);

    }
    return (<>

<tr>
      <th scope="row">1</th>
      <td>{props.defi.description}</td>
      <td>{props.defi.link}</td>
      <td> <iframe src={props.defi.link} title="YouTube video" allowfullscreen></iframe></td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" onClick={props.updateDefi}class="btn btn-success">modifier</button>
            <button type="button" onClick={deleteDefi} class="btn btn-danger">supprimer</button>
        </div>
      </td>
    </tr>
        
        
        
        
        </>  );
}
 
export default Defi;