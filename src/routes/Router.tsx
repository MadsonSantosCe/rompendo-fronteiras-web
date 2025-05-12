import { Home } from "@/pages/home/Home";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import { EmailVerification }  from "@/pages/auth/EmailVerification";
import { useAuthStore } from "@/lib/zustand/authStore";
import { useEffect } from "react";
import { getAccessToken } from "@/lib/utils";

const FullPageLoader = () => (
  <div className="fixed inset-0 bg-muted bg-opacity-70 flex items-center justify-center z-50">
    <div className="w-10 h-10 border-4 border-t-transparent border-slate-700 rounded-full animate-spin"></div>
  </div>
);

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const UnauthenticatedRouteLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const Router = () => {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const refreshTokenFn = useAuthStore((state) => state.refreshToken);

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      refreshTokenFn();
    }
  }, [refreshTokenFn]);

  if (isCheckingAuth) {
    return <FullPageLoader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<UnauthenticatedRouteLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> 
          <Route path="/verify-email" element={<EmailVerification />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
