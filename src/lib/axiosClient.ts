import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN!;

const axiosClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
