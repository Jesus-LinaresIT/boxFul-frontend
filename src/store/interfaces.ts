
interface AuthState {
   token: string | null;
   user: any;
   login: (token: string) => void;
   logout: () => void;
}