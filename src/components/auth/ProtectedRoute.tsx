import React from "react";

import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../hooks/state/hooks";

interface Props {
  children?: React.ReactNode;
}

export default function ProtectedRoutesGuard({ children }: Props) {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth);

  if (!user.isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}
