import axios from 'axios'
const config = {
    headers: {
        'x-auth-token': localStorage.getItem('token')
    }
};
export const getAllInviation = async () => {
    try {
        const result = await axios.get(
            'http://localhost:8080/inviter/all', config
        );
        console.log(result.data);
        return result.data;
    } catch (error) {

        console.log('error')
    }

}

export const addInvitation = async (firstName, lastName, email, dob, pob, sexe, job, ville, telephone, price, taille, poid, orientation, nbscweek) => {
    let date;
    if (dob) {
        date = dob._d.getDate() + "/" + (dob._d.getMonth() + 1) + "/" + dob._d.getFullYear();
    }

    const data = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "dob": date,
        "pob": pob,
        "sexe": sexe,
        "job": job,
        "ville": ville,
        "telephone": telephone,
        "price": parseFloat(price),
        "taille": parseFloat(taille),
        "poid": parseFloat(poid),
        "orientation": orientation,
        "nbscweek": nbscweek,
    }
    const result = await axios.post(
        'http://localhost:8080/inviter/', data, config
    );
    return result;
}



export const deleteInvitation = async (id) => {
    const { data } = await axios.put('http://localhost:8080/inviter/delete/' + id, {}, config);
    return data;
}