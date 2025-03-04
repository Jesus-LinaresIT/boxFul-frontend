import { create } from "zustand"
import { jwtDecode } from "jwt-decode"

export const useAuthStore = create<AuthState>((set) => ({
   access_token: null,
   user: null,
   isLoading: true,
   loginLS: (access_token) => {
      localStorage.setItem("access_token", access_token);
      const user = jwtDecode(access_token);
      set({ access_token, user });
   },
   logoutLS: () => {
      localStorage.removeItem("access_token");
      set({ access_token: null, user: null });
   },
   checkAuth: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
         const user = jwtDecode(access_token);
         set({ access_token, user, isLoading: false });
      }else{
         set({ isLoading: false });
      }
   },
}))