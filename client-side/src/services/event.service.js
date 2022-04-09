import axios from 'axios'
const config = {
    headers:{
        'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
        'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTAzZWE1N2U5NDM4N2RlY2FmMTMxNyIsImlhdCI6MTY0OTQyNzQ5NywiZXhwIjoxNjQ5NDYzNDk3fQ.UfUG4dSvQifSxux72VdfJez8LS0eZtRaGqH_BoeLPDw'
    }
  };
const url="http://localhost:8080/event/coach";  

export const getAllEvents =async()=>{
    try {
    const result = await axios.get(
        //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
          url, config
        );
        console.log(result.data);
        return result.data;
    } catch (error) {
        
     console.log('error')      }
   
}
export const addEvent=async(name,description,etat)=>{
    
    try {
        const data={
            'name':name,
            'description': description,
            'etat':etat
        }
        const result = await axios.post(
            //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
              url, data, config
            );
            console.log(result);
            return result;

            
        
    } catch (error) {
        console.log('erreur')
        console.log(error);
        
    }

}
export const updateEvent=async(id,name,description,etat)=>{
    
    try {
        const data={
            'name':name,
            'description': description,
            'etat':etat
        }
        const result = await axios.put(
            //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
              url+'/'+id, data, config
            );
            console.log(result);
        
    } catch (error) {
        console.log(error);
        
    }

}


export const deleteEventById = async (id) => {

 try {   
    await axios.delete(url+'/'+id,
   config);
    return true ;
   // setData(data.filter(defi=>defi._id !== id))    )
    
    } catch (error) {
        
    console.log('error')      }


  }