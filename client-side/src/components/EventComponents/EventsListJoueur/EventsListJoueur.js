import EventJoueur from "../EventJoueur/EventJoueur";
const EventsListJoueur = (props) => {
    const{data}=props;

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
            <><EventJoueur  event={event}  /></>
            ))
            
    }

  </tbody>
</table>  
    
    
    </> );
}
 
export default EventsListJoueur;