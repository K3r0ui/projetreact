import Event  from '../Event/Event';
const EventList = (props) => {
const {handleDeleteEventById,handleUpdateEvent,data,setData} = props;

    return ( <>
    <table class="table mt-3">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nom evennement</th>
        <th scope="col">Decription</th>
        <th scope="col">status</th>
        <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    {
        data.map((event)=>(
            <><Event key={event._id} event={event} handleDeleteEventById={handleDeleteEventById} handleUpdateEvent={handleUpdateEvent} setData={setData} /></>
            ))
            
    }

  </tbody>
</table>
    
    
    
    </> );
}
 
export default EventList;