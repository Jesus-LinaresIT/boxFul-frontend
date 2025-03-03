import { create } from "zustand"
import { jwtDecode } from "jwt-decode"

export const useAuthStore = create<AuthState>((set) => ({
   token: null,
   user: null,
   login: (token) => {
      localStorage.setItem("token", token);
      const user = jwtDecode(token);
      set({ token, user });
   },
   logout: () => {
      localStorage.removeItem("token");
      set({ token: null, user: null });
   },
}))