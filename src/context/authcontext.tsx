import axiosInstance from "@/config/axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  username: string;
  image: string;
  role: string;
  id: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  location_id: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  storeToken: (token: string) => void;
  logoutUser: () => void;
  checkAuth: () => Promise<User | null>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const myToken = localStorage.getItem("access_token");
  const [token, setToken] = useState<string | null>(myToken || null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);
  const [user, setUser] = useState<User | null>(null);

  // Updated to use navigate instead of window.location
  const logoutUser = async () => {
    setToken(null);
    setIsLoggedIn(false);
    setUser(null);
    await axiosInstance.post("/api/auth/logout");
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const storeToken = (token: string) => {
    setToken(token);
    localStorage.setItem("access_token", token);
    setIsLoggedIn(true);
  };

  const checkAuth = async (): Promise<User | null> => {
    try {
      const res = await axiosInstance.get("/api/users/current/user", {
        // const res = await axiosInstance.get("/api/users/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setUser(res.data);
        return res.data;
      } else {
        logoutUser();
        return null; // Ensure all code paths return a value
      }
    } catch (error) {
      logoutUser();
      return null; // Ensure all code paths return a value
    }
  };

  useEffect(() => {
    checkAuth();
  }, [myToken]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        user,
        logoutUser,
        checkAuth,
        storeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
