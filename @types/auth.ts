export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; token: string; message: string }>;
  logout: () => Promise<void>;
}
