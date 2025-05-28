import { Home } from "@/pages/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { EmailVerification } from "@/pages/auth/EmailVerification";
import { useAuth, useVerifyAcsessToken } from "@/hooks/auth/useAuthentication";
import { FullPageLoader } from "@/components/FullPageLoader";
import { AuthProvider } from "@/contexts/auth/authProvider";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { ResetPassword } from "@/pages/auth/ResetPassword";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useVerifyAcsessToken();
  const { user } = useAuth();

  if (isLoading) {
    return <FullPageLoader />;
  }

  return user ? children : <Navigate to="/login" />;
};

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
