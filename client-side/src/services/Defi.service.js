import axios from 'axios'
export const getAllDefis =async()=>{
    try {
    const result = await axios.get(
        //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
          'http://localhost:8080/defi/coach', {
          headers: {
            'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
            'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGE0NzRmMWZlOTI4ZWUwYmE3ZDNlNyIsImlhdCI6MTY0OTE3ODMyNCwiZXhwIjoxNjQ5MjE0MzI0fQ.UJHgPNUbc8AZdQDAglLG_-rEUgpVGraSJ2QMHnzOyOY'
          }
        }
        );
        console.log(result.data);
        return result.data;
    } catch (error) {
        
     console.log('error')      }
   
}




export const deleteDefiById = async (id) => {

 try {   
    await axios.delete('http://localhost:8080/defi/coach/'+id,
    {
      headers: {
        'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
        'x-auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGE0NzRmMWZlOTI4ZWUwYmE3ZDNlNyIsImlhdCI6MTY0OTA4NDQ1NywiZXhwIjoxNjQ5MTIwNDU3fQ.OqBk0Rqt53vJKQCONXXYc-34TbjBTOECXahD9_Scvuc'
      }
    });
    return true ;
   // setData(data.filter(defi=>defi._id !== id))    )
    
    } catch (error) {
        
    console.log('error')      }


  }