import axios from 'axios';

const config = {
    headers: {
        'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTkxZTJkMTI0NDgxNjllYjQwNmU1NSIsImlhdCI6MTY1MDIwOTUwNSwiZXhwIjoxNjUwMjQ1NTA1fQ.rtl6agO7Mr1XmRyBdbDTe0GBrLxL9anZsd6KwwBXUg0',
    },
};


export const getProfile = async () => {
    try {
        const { data } = await axios.get(
            'http://localhost:8080/joueur/profile',
            config
        );
        return data;
    } catch (error) {
        console.log('error');
    }
};

export const updateJoueur = async ({ dob, ...rest }) => {
    let date;
    if (dob) {
        date = dob.format('DD/MM/YYYY');
    }
    const { data } = await axios.put(
        'http://localhost:8080/joueur/modifierprofile',
        { ...rest, ...(dob && { dob: date }) }, config
    );
    return data;
};

export const updatePassword = async (oldPassword, newPassword) => {
    const password = {
        oldPassword: oldPassword,
        newPassword: newPassword
    };
    const { data } = await axios.put(
        'http://localhost:8080/joueur/modifierpassword',
        password, config
    );
    return data;
};
