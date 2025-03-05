import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      'Content-Type': 'application/json',
   },
});

api.interceptors.request.use(
   (config) => {
      const { access_token } = useAuthStore.getState();
      console.log(access_token);
      
      if (access_token){
         config.headers.Authorization = `Bearer ${access_token}`
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
)

export default api;