import axios from 'axios'
const config = {
    headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTAzZThmN2U5NDM4N2RlY2FmMTMxNSIsImlhdCI6MTY0OTQ1MDU2OCwiZXhwIjoxNjQ5NDg2NTY4fQ.hhRJDLhmNGT65Q06zkjD7hI18Xrwa6p7r3WKcGGsPgg'
    }
};
export const getAllCompetence = async () => {
    try {
        const result = await axios.get(
            'http://localhost:8080/competence/coach', config
        );
        console.log(result.data);
        return result.data;
    } catch (error) {

        console.log('error')
    }

}
export const addCompetence = async (title, description, lien) => {
    try {
        const data = {
            'title': title,
            'description': description,
            'link': lien
        }
        const result = await axios.post(
            'http://localhost:8080/competence/coach', data, config
        );
        console.log(result);
        return result;
    } catch (error) {
        console.log('erreur')
        console.log(error);

    }

}
export const updateCompetnece = async (id, title, description, lien) => {
    try {
        const data = {
            'title': title,
            'description': description,
            'link': lien
        }
        const result = await axios.put(
            'http://localhost:8080/competence/coach/' + id, data, config
        );
        console.log(result);

    } catch (error) {
        console.log(error);

    }

}


export const deleteCompetence = async (id) => {
    try {
        await axios.delete('http://localhost:8080/competence/coach/' + id,
            config);
        return true;
    } catch (error) {

        console.log('error')
    }

}