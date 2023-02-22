import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../components/common";
import Home from "../pages/Home";
import { UserDetail } from "../pages/UserDetail";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/detail/:username" element={<UserDetail />} />
    </Routes>
  );
}
