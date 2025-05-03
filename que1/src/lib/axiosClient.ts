import axios from 'axios';

const baseURL = '/api';
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN!;

const axiosClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});

export const testfetchUsers = async (): Promise<any> => {
  try {
    const res = await axiosClient.get('/users');
    console.log(res.data);
    const data = res.data;


    const users = Object.entries(data.users || data).map(([id, name]) => ({
      id,
      name: name as string,
    }))

    console.log(users);
    

    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export default axiosClient;
