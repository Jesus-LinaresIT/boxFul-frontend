import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";
import { useEffect } from "react";


const withAuth = (WrapperComponent: any) => {
   return (props: any) => {
      const {access_token, checkAuth, isLoading} = useAuthStore();
      const router = useRouter();

      useEffect(() => {
         checkAuth();
      }, []);

      useEffect(() => {
         if (!access_token && !isLoading) {
            router.push("/auth/login");
         }
      }, [access_token, isLoading]);

      if (isLoading) return <p>Cargando...</p>;

      return <WrapperComponent {...props} />;
   }
}

export default withAuth;