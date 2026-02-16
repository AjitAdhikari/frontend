import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/authcontext";
// import AccessDenied from "@/common/access-denied/page";
import { Role } from "@/enum/enum";

const AdminProtectedRoute = () => {
  const { user, isLoggedIn } = useAuth();
  if (
    (isLoggedIn && user?.role === Role.CITYADMIN) ||
    (isLoggedIn && user?.role === Role.SUPERADMIN)
  ) {
    return <Outlet />;
  }
  return (
    <>
      {/* <AccessDenied /> */}
    </>
  ); // Redirect to login if not authenticated
};

export default AdminProtectedRoute;
