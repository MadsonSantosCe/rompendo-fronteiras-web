import { Home } from "@/page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/page/auth/Login";
import PrivateRouter from "./PrivateRouter";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
