import axios from 'axios';
const config = {
    headers:{
        'api_key': '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
        'x-auth-token': localStorage.getItem('token')
    }
  };
const url = "http://localhost:8080/coach/seance"
  export const getAllSeances =async()=>{
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

export const getSingleSeancePlayer =async(id)=>{
  try {
  const result = await axios.get(
      //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
        url+"/joueur/"+id, config
      );
      console.log(result.data);
      return result.data;
  } catch (error) {
      
   console.log('error')      }
 
}

export const addSeance = async(titre,joueur,lieu,program,date,competences ,statistiques)=>{
  try {
    const data={
        'titre': titre,
        "joueur":joueur,
        "lieu":lieu,
        "program":program,
        "date":date,
        "competences":competences,
        "statistiques":statistiques
    
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
export const updateEtatSeance=async(id,etat)=>{
    
  try {
      const data={
          'etat': etat,
        
      }
      const result = await axios.put(
          //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
            url+'/etat/'+id, data, config
          );
          return result;
          console.log(result);
      
  } catch (error) {
      console.log(error);
      
  }

}
export const feedbackSeance=async(id,feedback,goal)=>{
    
  try {
      const data={
          'feedback':feedback,
          'goal':goal,
        
      }
      const result = await axios.put(
          //  `http://${process.env.REACT_APP_BACKEND_DNS}:8080/`, {
            url+'/feedback/'+id, data, config
          );
          return result;

          console.log(result);
      
  } catch (error) {
      console.log(error);
      
  }

}