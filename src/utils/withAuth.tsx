import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";
import { useEffect } from "react";


const withAuth = (WrapperComponent: any) => {
   return (props: any) => {
      const token = useAuthStore();
      const router = useRouter();

      useEffect(() => {
         if (!token) {
            router.push("/auth/login");
         }
      }, [token]);

      if (!token) return null;

      return <WrapperComponent {...props} />;
   }
}

export default withAuth;