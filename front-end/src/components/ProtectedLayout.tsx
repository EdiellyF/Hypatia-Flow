import { Navigate, Outlet } from "react-router-dom";
import { MainNav } from "./MainNav";
import { useAppStore } from "../store/AppStore";

const ProtectedLayout = () => {
  const { user } = useAppStore();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;