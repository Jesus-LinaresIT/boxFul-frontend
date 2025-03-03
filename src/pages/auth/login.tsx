import { login } from "@/services/authServices";
import { Button, Card, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/auth.module.css";
import { useAuthStore } from "@/store/authStore";


const Login = () => {
   const [loading, setLoading] = useState(false);
   const router = useRouter();
   const { loginLS } = useAuthStore();

   const onFinish = async (values: {email: string; password: string}) => {
      setLoading(true);
      try {
         console.log(values);
         const data = await login(values);
         loginLS(data.access_token);
         message.success("Login exitoso");
         router.push("/");
      } catch (error) {
         message.error('Credenciales incorrectas');
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className={styles.container}>
         <Card title="Iniciar Sesion" className={styles.card}>
            <Form layout="vertical" onFinish={onFinish}>
               <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Ingresa tu correo' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
               >
                  <Input.Password />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} className={styles.button}>
                     Login
                  </Button>
               </Form.Item>
            </Form>
         </Card>
      </div>
   );
};

export default Login;

