import axios from 'axios'
const config = {
    headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTAzZThmN2U5NDM4N2RlY2FmMTMxNSIsImlhdCI6MTY0OTQ1MDU2OCwiZXhwIjoxNjQ5NDg2NTY4fQ.hhRJDLhmNGT65Q06zkjD7hI18Xrwa6p7r3WKcGGsPgg'
    }
};
export const getAllDiscipline = async () => {
    try {
        const result = await axios.get(
            'http://localhost:8080/discipline/coach', config
        );
        return result.data;
    } catch (error) {

        console.log('error')
    }

}