import axios from 'axios';
const config = {
   headers: {
      api_key: '=sqfusqhfhkjdshfjsf65464dsfd8sq8+',
      'x-auth-token':
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTAzZWE1N2U5NDM4N2RlY2FmMTMxNyIsImlhdCI6MTY0OTgwNjk0NywiZXhwIjoxNjQ5ODQyOTQ3fQ.LteyUIDJISIY2bNnahnmNfomiNS1hMu2hgPJZKI08k0',
   },
};

const url = 'http://localhost:8080/program/coach';

export const getAllPrograms = async () => {
   try {
      const { data } = await axios.get(url, config);
      console.log(data);
      return data;
   } catch (error) {
      console.log('error');
   }
};
export const addProgram = async (name, description, image, videoLink) => {
   const data = {
      name: name,
      description: description,
      image: image,
      videoLink: videoLink,
   };
   const result = await axios.post(url, data, config);
   console.log(result);
   return result;
};
export const updateProgram = async (
   id,
   name,
   description,
   image,
   videoLink
) => {
   const input = {
      name: name,
      description: description,
      image: image,
      videoLink: videoLink,
   };
   const { data } = await axios.put(url + '/' + id, input, config);
   return data;
};

export const deleteProgramById = async (id) => {
   const { data } = await axios.delete(url + '/' + id, config);
   return data;
};
