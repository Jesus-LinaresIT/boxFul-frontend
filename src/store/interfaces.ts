
interface AuthState {
   access_token: string | null;
   user: any;
   loginLS: (access_token: string) => void;
   logoutLS: () => void;
   checkAuth: () => void;
}