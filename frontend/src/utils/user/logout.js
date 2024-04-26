import axios from 'axios';

export const logoutUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/user/logout', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      withCredentials: true
    });

    console.log('response', response);

    if (response.status === 200) {
      console.log('Logout successfully');
      return response.data.message;
    }
  } catch (error) {
    console.error(error);
    return null
  }
}

export default logoutUser;