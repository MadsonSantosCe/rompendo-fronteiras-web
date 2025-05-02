import { Home } from "@/page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/page/auth/Login";
import PrivateRouter from "./PrivateRouter";
import { AppcontextProvider } from "@/auth/ContextProvider";
import { Register } from "@/page/auth/Register";

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
