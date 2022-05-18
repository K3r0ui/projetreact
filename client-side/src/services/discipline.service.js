import axios from 'axios'
const config = {
    headers: {
        'x-auth-token': localStorage.getItem('token'),
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