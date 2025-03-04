import { Button, Card, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { register } from '@/services/authServices';

import styles from "../../styles/auth.module.css";


const Register = () => {
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const onFinish = async ( values: {name: string, email: string, password: string} ) => {
      setLoading(true);
      try {
         console.log(values);
         const data = await register(values);
         if(data.status === 'success'){
            message.success('Usuario registrado correctamente');
            router.push('/auth/login');
         }
      } catch (error: any) {
         const errorMessage = error.response.data.message;
         if(Array.isArray(errorMessage)){
            errorMessage.map((messageApi: string) => {
               message.error(messageApi);
            });
         }else{
            message.error(errorMessage);
         }
      }finally{
         setLoading(false);
      }

   }

   return (
      <div className={styles.container}>
         <Card title="Registro de usuario" className={styles.card}>
            <Form layout="vertical" onFinish={onFinish}>
               <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}>
                  <Input />
               </Form.Item>
               <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor ingrese su email' }]}>
                  <Input />
               </Form.Item>
               <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}>
                  <Input.Password />
               </Form.Item>
               <Button type='primary' htmlType='submit' loading={loading} className={styles.button}>
                  Registrarse
               </Button>
            </Form>
            <p style={{ marginTop: 10, textAlign: 'center' }}>
               ¿Ya tienes una cuenta? <a onClick={() => router.push('/auth/login')}>Inicia sesión</a>
            </p>
         </Card>
      </div>
   )
}

export default Register;