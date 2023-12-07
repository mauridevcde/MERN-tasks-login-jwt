import { useAuth } from "./context/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { loading ,isAuthenticated } = useAuth();
  
  // si esta cargando, entonces se muestra un mensaje de cargando
  // si no esta autenticado y no esta cargando, entonces se redirige a la pagina de login
 
  if (loading) return <h1>Loading...</h1>;

  if (!loading && !isAuthenticated) return <Navigate replace to="/login" />;

  return <Outlet />;
}
