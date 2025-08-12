import { Navigate, Outlet } from "react-router-dom";
import { MainNav } from "./MainNav";
import { useAppStore } from "../store/AppStore";
import SakuraBackground from "./SakuraBackground";  // Importe o componente

const ProtectedLayout = () => {
  const { user } = useAppStore();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen"> 
      <SakuraBackground /> 
      <MainNav />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;