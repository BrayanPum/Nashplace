import { Navigate, Outlet } from "react-router-dom"; // Importar Navigate y Outlet desde react-router-dom
import { useAuth } from "./context/AuthContext"; // Importar hook useAuth desde el contexto AuthContext

// Definir el componente de ruta protegida
function ProtectedRoute() {
  // Obtener el estado de carga y autenticación desde el contexto de autenticación
  const { loading, isAuthenticated } = useAuth();

  // Si la aplicación está cargando, mostrar un mensaje de carga
  if (loading) return <h1>Cargando...</h1>;

  // Si la carga ha finalizado y el usuario no está autenticado, redireccionar al inicio de sesión
  if (!loading && !isAuthenticated) return <Navigate to="login" replace />;

  // Si el usuario está autenticado, renderizar el contenido de la ruta protegida
  return <Outlet />;
}

// Exportar el componente de ruta protegida
export default ProtectedRoute;
