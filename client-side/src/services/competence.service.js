import axios from 'axios'
const config = {
    headers: {
        'x-auth-token': localStorage.getItem('token')
    }
};
export const getAllCompetence = async () => {
    try {
        const { data } = await axios.get(
            'http://localhost:8080/competence/coach', config
        );
        return data;
    } catch (error) {
        console.log('error')
    }
}

export const addCompetence = async (input) => {
    const { data } = await axios.post(
        'http://localhost:8080/competence/coach', input, config
    );

    return data;
};

export const updateCompetnece = async (id, input) => {
    const { data } = await axios.put(
        'http://localhost:8080/competence/coach/' + id, input, config
    );
    return data;
}

export const deleteCompetence = async (id) => {
    const { data } = await axios.delete('http://localhost:8080/competence/coach/' + id,
        config);
    return data;

}