import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../view/layouts/AuthLayout";
import { Dashboard } from "../view/pages/Dashboard";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/Register";
import { AuthGuard } from "./AuthGuard";
import { AppRoutes } from "./constants";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path={AppRoutes.LOGIN} element={<Login />} />
            <Route path={AppRoutes.REGISTER} element={<Register />} />
          </Route>
        </Route>
        <Route element={<AuthGuard isPrivate />}>
          <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
