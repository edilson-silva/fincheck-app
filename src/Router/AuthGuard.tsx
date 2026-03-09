import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";
import { AppRoutes } from "./constants";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }
  if (signedIn && !isPrivate) {
    return <Navigate to={AppRoutes.DASHBOARD} replace />;
  }

  return <Outlet />;
}
