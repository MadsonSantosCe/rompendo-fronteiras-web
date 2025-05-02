import { Home } from "@/page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/page/auth/Login";
import PrivateRouter from "./PrivateRouter";
import { AppcontextProvider } from "@/auth/ContextProvider";

export const Router = () => {
  return (
    <BrowserRouter>
      <AppcontextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRouter />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AppcontextProvider>
    </BrowserRouter>
  );
};
