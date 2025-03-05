import { useAuthStore } from "../store/authStore";
import { Button, Layout, Avatar, Typography, Image } from "antd";
import withAuth from '../utils/withAuth';
import OrderForm from "./components/OrderForm";

import styles from "../styles/dashboard.module.css"

const { Header, Content } = Layout;
const { Text } = Typography;

const Dashboard = () => {
   const { user, logoutLS, } = useAuthStore();

   return (
      <Layout>
         <Header className={styles.header}>
            <div className={styles.logo}>
               <img src="/logoBoxful.png" alt="Boxful Logo" />
            </div>

            <div className={styles.userSection}>
               {user && (
                  <>
                     <Avatar style={{ backgroundColor: "#f56a00" }}>
                        {user.name.charAt(0)}
                     </Avatar>
                     <Text className={styles.username}>{user.name}</Text>
                     <Button type="primary" danger onClick={logoutLS}>
                        Cerrar Sesión
                     </Button>
                  </>
               )}
            </div>
         </Header>

         {/* {user && <p>Usuario: {user.name}</p>} */}
         {/* <Button type="primary" danger onClick={logoutLS}>
            Cerrar Sesión
         </Button> */}
         <OrderForm />
      </Layout>
   );
};

export default withAuth(Dashboard);
