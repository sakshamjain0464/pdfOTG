import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3000/user/login', {
      username,
      password,
    });
    if(response.status === 200) {
      console.log('User logged in successfully');
      return response.data.user;
    }
  } catch (error) {
    if(error.response.status === 401) {
      return 'Unauthorized';
    }
    console.error(error);
    return null
  }
}

export default login;