import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "../store/authStore";


const Dashboard = () => {
   const router = useRouter();
   const { access_token, user, checkAuth } = useAuthStore();

   useEffect(() => {
      checkAuth();
   }, []);

   // Si no hay token, redirige al login
   useEffect(() => {
      console.log(access_token);

      if (!access_token) {
         router.push("/auth/login");
      }
   }, [access_token, router]);

   return (
      <div>
         <h1>Bienvenido al Dashboard</h1>
         {user && <p>Usuario: {user.name}</p>}
      </div>
   );
};

export default Dashboard;
