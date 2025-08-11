import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ children }: { children: any }) => {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

