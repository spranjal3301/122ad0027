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



export default axiosClient;
