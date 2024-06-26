import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3000/user/login', {
      username,
      password,
    }, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      withCredentials: true
    });
    if (response.status === 200) {
      console.log('User logged in successfully');
      return response.data;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      return 'Unauthorized';
    }
    console.error(error);
    return null
  }
}

export default login;