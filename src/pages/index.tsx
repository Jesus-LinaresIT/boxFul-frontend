import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "../store/authStore";
import { Button } from "antd";
import withAuth from '../utils/withAuth';
import OrderForm from "./components/OrderForm";


const Dashboard = () => {
   const { user, logoutLS, } = useAuthStore();

   return (
      <div>
         {/* <h1>Bienvenido al Dashboard</h1> */}
         {user && <p>Usuario: {user.name}</p>}
         <Button type="primary" danger onClick={logoutLS}>
            Cerrar Sesión
         </Button>
         <OrderForm />
      </div>
   );
};

export default withAuth(Dashboard);
