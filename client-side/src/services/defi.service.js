import axios from 'axios';
const configJ = {
    headers: {
        
       'x-auth-token': localStorage.getItem('token'),
    },
 };
const config = {
    headers:{
        'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
        'x-auth-token':localStorage.getItem('token')
    }
  };
  /// get all defi from coach
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
      await axios.delete('http://localhost:8080/defi/coach/' + id, config);
      return true;
      // setData(data.filter(defi=>defi._id !== id))    )
   } catch (error) {
      console.log('error');
   }
};
// Service pour assigner defi
export const assignerDefi = async (id,joueur,delai) => {
    try {
        await joueur.map(j => {
            
            const ad = {
                'joueur':j,
                'delai':delai,
            }
            console.log("gvrfzef",ad)
            const rs =  axios.put('http://localhost:8080/defi/coach/assigned/'+id,ad,config);
            
        })
            
    
    
    return "success";
    }catch(err){
        console.log(err);

    }
// get all defi from joueur 

};

export const getAllDefisJ = async () => {
    try {
        const rs = await axios.get(
            'http://localhost:8080/defi/joueur',configJ
        );
        console.log(rs.data);
        return rs
    } catch (error) {
        console.log(error);
    }
};