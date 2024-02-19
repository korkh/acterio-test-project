import {
  getAccountDetailsRoles
} from "entities/Account/model/selectors/accountDetails";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../StoreProvider/configureStore";

interface Props {
  roles?: string[];
}

export default function RequireAuth({ roles }: Props) {
  const user = useAppSelector(getAccountDetailsRoles);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (roles && !roles.some((r) => user.includes(r))) {
    toast.error("Not authorised to access this area");
    return <Navigate to="/posts" />;
  }

  return <Outlet />;
}
