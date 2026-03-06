import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "./constants";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }
  if (signedIn && !isPrivate) {
    return <Navigate to={AppRoutes.DASHBOARD} replace />;
  }

  return <Outlet />;
}
