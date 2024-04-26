import axios from 'axios';

export const getUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/user/getUser', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      withCredentials: true
    });

    console.log('response', response);

    if (response.status === 200) {
      console.log('User logged in successfully');
      return response.data.user;
    }
  } catch (error) {
    if (error.response.status === 401) {
      console.log(error.response);
      return 'Unauthorized';
    }
    console.error(error);
    return null
  }
}

export default getUser;