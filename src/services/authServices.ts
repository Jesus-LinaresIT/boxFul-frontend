import api from './api';

export const login = async (loginData: LoginData) => {
   const { data } = await api.post('/auth/login', loginData);
   return data;
}