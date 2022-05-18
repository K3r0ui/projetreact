import axios from 'axios';
const config = {
   headers: {
      api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
      'x-auth-token': localStorage.getItem('token'),
   },
};
const url = 'http://localhost:8080/coach/';

export const getCurrentCoachProfile = async () => {
   const { data } = await axios.get(url + 'profile', config);
   return data;
};

// update Coach
export const updateCoach = async ({ dob, ...rest }) => {
   let date;
   if (dob) {
      date = dob.format('YYYY-MM-DD');
   }
   const { data } = await axios.put(
      url+'modifierprofile',
      { ...rest, ...(dob && { dob: date }) },
      config
   );
   return data;
};
// update password 
export const updatePasswordCoach = async (oldPassword,newPassword)=>{
   const {data} = await axios.put(
      url+'modifierpassword',oldPassword,newPassword,config
   );
   return data;
}
// export const getCurrentJoueurProfile = () => {} // implemented within joueur.service

export const getAllJoueurs = async () => {
   try {
      const result = await axios.get(url + 'alljoueurs', config);
      console.log(result.data);
      return result.data;
   } catch (error) {
      console.log('error');
   }
};

// add Displine to coach 

export const addDisciplineCoach = async (newDis) => {

   try {
      const result = await axios.put(url + 'discipline',{discipline : newDis },config);
      console.log(result.data);

   }catch(err){
        console.log(err)
   }
};