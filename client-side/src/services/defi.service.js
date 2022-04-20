import axios from 'axios'
const config = {
    headers:{
        'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
        'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTAzZWE1N2U5NDM4N2RlY2FmMTMxNyIsImlhdCI6MTY1MDQ2MjExOCwiZXhwIjoxNjUwNDk4MTE4fQ.0x7msRHeOahfHeZ3iRH4XleIXQMMilp7dUbgcmuD_bg'
    }
  };
export const getAllDefis =async()=>{
    try {
    const result = await axios.get(
        //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
          'http://localhost:8080/defi/coach', config
        );
        console.log(result.data);
        return result.data;
    } catch (error) {
        
     console.log('error')      }
   
}
export const addDefi=async(description,lien)=>{
    
    try {
        const data={
            'description': description,
            'link':lien
        }
        const result = await axios.post(
            //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
              'http://localhost:8080/defi/coach', data, config
            );
            console.log(result);
            return result;

            
        
    } catch (error) {
        console.log('erreur')
        console.log(error);
        
    }

}
export const updateDefi=async(id,description,lien)=>{
    
    try {
        const data={
            'description': description,
            'link':lien
        }
        const result = await axios.put(
            //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
              'http://localhost:8080/defi/coach/'+id, data, config
            );
            console.log(result);
        
    } catch (error) {
        console.log(error);
        
    }

}


export const deleteDefiById = async (id) => {

 try {   
    await axios.delete('http://localhost:8080/defi/coach/'+id,
   config);
    return true ;
   // setData(data.filter(defi=>defi._id !== id))    )
    
    } catch (error) {
        
    console.log('error')      }


  }