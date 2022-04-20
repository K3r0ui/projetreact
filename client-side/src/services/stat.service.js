import axios from 'axios'
const config = {
    headers: {
        'x-auth-token': localStorage.getItem('token')
    }
};
export const getAllStat = async () => {
    try {
        const { data } = await axios.get(
            'http://localhost:8080/stat/coach', config
        );
        return data;
    } catch (error) {
        console.log('error')
    }
}
export const addStat = async (title, description, lien, type, unite, discipline) => {
    const input = {
        'title': title,
        'description': description,
        'lien': lien,
        'type': type,
        'unite': unite,
        'discipline': discipline
    }
    const { data } = await axios.post(
        'http://localhost:8080/stat/coach', input, config
    );
    return data;
}
export const updateStat = async (id, title, description, lien, type, unite) => {
    const input = {
        'title': title,
        'description': description,
        'lien': lien,
        'type': type,
        'unite': unite
    }
    const { data } = await axios.put(
        'http://localhost:8080/stat/coach/' + id, input, config
    );
    return data
};

export const deleteStat = async (id) => {
    const { data } = await axios.delete('http://localhost:8080/stat/coach/' + id,
        config);
    return data;
}