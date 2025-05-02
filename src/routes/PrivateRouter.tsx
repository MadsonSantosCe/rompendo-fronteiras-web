import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const isAuthenticated = null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
