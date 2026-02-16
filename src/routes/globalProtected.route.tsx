import { useAuth } from "@/context/authcontext";
import Layout from "@/layout/layout";
import { Navigate } from "react-router-dom";

const GlobalProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Layout />;
};

export default GlobalProtectedRoute;
  