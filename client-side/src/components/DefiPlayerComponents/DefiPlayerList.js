import React from 'react'
import DefiPlayer from './DefiPlayer'
function DefiPlayerList({data,handleMakeDoneJoeurById}) {
  return (
    <table class="table mt-3">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nom Defi</th>
        <th scope="col">Defi Link</th>
        <th scope="col">Source</th>
        <th scope="col">Done</th>
        <th scope="col">Actions</th>
    </tr>
    </thead>
    <tbody>
    {console.log(data)}
    {
        data.map((defi)=>(
            <><DefiPlayer key={defi._id} makeDoneJoeur={handleMakeDoneJoeurById} defi={defi} /></>
            ))
            
    }

  </tbody>
    </table>
  )
}

export default DefiPlayerList