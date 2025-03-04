
interface AuthState {
   access_token: string | null;
   user: any;
   isLoading: boolean;
   loginLS: (access_token: string) => void;
   logoutLS: () => void;
   checkAuth: () => void;
}