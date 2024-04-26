import axios from 'axios';

export const signup = async (username, password, firstname, lastname, email) => {
    try {
        const response = await axios.post('http://localhost:3000/user/register', {
            username,
            password,
            firstname,
            lastname,
            email
        }, {headers: {
            "Access-Control-Allow-Origin": '*'
        },withCredentials: true});
        if (response.status === 200) {
            console.log('User logged in successfully');
            return "User registered successfully";
        }
    } catch (error) {
        if (error.response.status === 400) {
            return 'Already exists';
        }
        console.error(error);
        return null
    }
}

export default signup;