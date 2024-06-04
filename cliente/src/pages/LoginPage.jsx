import { useForm } from "react-hook-form";
import "./LoginForm.css"; // Importar estilos personalizados
import { useAuth } from "../context/AuthContext"; // Importar hook de autenticación
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Definir el componente de la página de inicio de sesión
function LoginPage() {
  // Utilizar useForm para manejar el formulario y sus errores
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  // Obtener funciones y estados de autenticación desde el contexto de autenticación
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  
  // Utilizar useNavigate para redireccionar después de la autenticación
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  // Redireccionar a la lista de productos después de la autenticación
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  // Renderizar el formulario de inicio de sesión
  return (
    <div className="wrapper mx-auto">
      <form onSubmit={onSubmit}>
        {/* Mostrar errores de inicio de sesión, si los hay */}
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center" key={i}>
            {error}
          </div>
        ))}
        <h1>Iniciar Sesión</h1>

        {/* Campo de entrada para el nombre de usuario */}
        <div className="input-box">
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Usuario"
            maxLength={30} // Limitar a 30 caracteres
          />
        </div>
        
        {/* Campo de entrada para la contraseña */}
        <div className="input-box">
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Contraseña"
            required
            maxLength={30} // Limitar a 30 caracteres
          />
        </div>
        
        {/* Botón para enviar el formulario */}
        <button type="submit" className="hover:bg-indigo-600">Iniciar Sesión</button>
        
        {/* Enlace para registrarse */}
        <div className="register-link">
          <p>
            No estás Registrado? <a href="/register">Registrarse</a>
          </p>
        </div>
      </form>
    </div>
  );
}

// Exportar el componente de la página de inicio de sesión
export default LoginPage;
