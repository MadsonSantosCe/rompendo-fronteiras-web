import { Home } from "@/pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/pages/auth/Login";
import { AppcontextProvider } from "@/components/auth/contextProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { Register } from "@/pages/auth/Register";

export const Router = () => {
  return (
    <BrowserRouter>
      <AppcontextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      </AppcontextProvider>
    </BrowserRouter>
  );
};
