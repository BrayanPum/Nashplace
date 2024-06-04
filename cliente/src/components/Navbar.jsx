// Importar el archivo de estilos para la barra de navegación
import '../pages/LoginForm.css';

// Importar el componente Link de react-router-dom para navegar entre rutas
import { Link } from "react-router-dom";

// Importar el hook useAuth desde el contexto AuthContext
import { useAuth } from "../context/AuthContext";

// Definir el componente de la barra de navegación
function Navbar() {
  // Utilizar el hook useAuth para obtener información de autenticación y usuario
  const { isAuthenticated, logout, user } = useAuth();

  // Definir un array de usuarios autorizados
  const authorizedUsers = ['bmantilla', 'administrador']; // Añade más nombres de usuario según sea necesario

  // Renderizar el componente de la barra de navegación
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      {/* Enlace al inicio de la aplicación o a la lista de productos, dependiendo del estado de autenticación */}
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold text-white px-2">Nashplace </h1>
      </Link>

      
      {/* Lista de elementos de la barra de navegación */}
      <ul className="flex gap-x-2">
        {/* Mostrar elementos diferentes según el estado de autenticación */}
        {isAuthenticated ? (
          // Si el usuario está autenticado
          <>
            {/* Mostrar el nombre de usuario */}
            <li>
              Bienvenido {user.username}
            </li>
            {/* Enlace para añadir un nuevo producto, solo visible para usuarios autorizados */}
            {authorizedUsers.includes(user.username) && (
              <li>
                <Link to="/add-task" className='bg-indigo-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white'>Añadir Producto</Link>
              </li>
            )}
            {authorizedUsers.includes(user.username) && (
            <li>
              <Link to="/reports" className='bg-green-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white'>Informes</Link>
            </li>
            )}
            {/* Botón para cerrar sesión */}
            <li>
              <Link to="/" className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md' onClick={() => {
                logout(); // Función para cerrar sesión
              }}>Cerrar Sesion</Link>
            </li>
          </>
        ) : (
          // Si el usuario no está autenticado
          <>
            {/* Enlace para iniciar sesión */}
            <li>
              <Link to="/login" className='bg-indigo-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white'>Iniciar Sesion</Link>
            </li>
            {/* Enlace para registrarse */}
            <li>
              <Link to="/register" className='bg-indigo-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white'>Registro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

// Exportar el componente de la barra de navegación
export default Navbar;
