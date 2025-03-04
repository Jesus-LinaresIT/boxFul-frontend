import api from './api';

export const login = async (loginData: LoginData) => {
   const { data } = await api.post('/auth/login', loginData);
   return data;
}

export const register = async (registerData: RegisterData) => {
   const { data } = await api.post('/auth/register', registerData);
   return data;
}

export const orderCreate = async (orderData: any) => {
   const { data } = await api.post('/orders/create', orderData);
   return data;
}