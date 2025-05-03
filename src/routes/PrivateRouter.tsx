import { UseAuthentication } from "@/context/auth/authProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { user } = UseAuthentication();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
