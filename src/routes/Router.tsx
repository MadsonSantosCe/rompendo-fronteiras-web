import { Home } from "@/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/pages/auth/Login";
import PrivateRouter from "./privateRouter";
import { AppcontextProvider } from "@/context/auth/contextProvider";
import { Register } from "@/pages/auth/Register";

export const Router = () => {
  return (
    <BrowserRouter>
      <AppcontextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRouter />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AppcontextProvider>
    </BrowserRouter>
  );
};
