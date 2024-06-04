import "./RegisterForm.css"; // Importar estilos personalizados
import { useForm } from "react-hook-form"; // Importar hook useForm
import { useAuth } from "../context/AuthContext"; // Importar hook de autenticación
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Definir el componente de la página de registro
function RegisterPage() {
  // Utilizar useForm para manejar el formulario y sus errores
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Obtener funciones y estados de autenticación desde el contexto de autenticación
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  // Utilizar useNavigate para redireccionar después del registro
  const navigate = useNavigate();

  // Redireccionar a la lista de productos después del registro
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  // Función para manejar el envío del formulario de registro
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  // Renderizar el formulario de registro
  return (
    <div className="wrapper mx-auto">
      {/* Mostrar errores de registro, si los hay */}
      {registerErrors.map((error, i) => (
        <div className="bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <h1>Registro</h1>

        {/* Campo de entrada para el nombre */}
        <input
          type="text"
          {...register("nombre", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Nombre"
          maxLength={30}
        />

        {/* Campo de entrada para la identificación */}
        <input
          type="number"
          {...register("identificacion", {
            required: "La identificación es obligatoria",
          })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Identificación"
          maxLength={30}
          onKeyDown={(e) => {
            if (
              e.key === "e" ||
              e.key === "E" ||
              e.key === "+" ||
              e.key === "-" 
            ) {
              e.preventDefault();
            }
          }}
        />

        {/* Campo de entrada para el correo electrónico */}
        <input
          type="email"
          {...register("correoElectronico", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Correo Electrónico"
          maxLength={30}
        />

        {/* Campo de entrada para el teléfono */}
        <input
          type="number"
          {...register("telefono", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Teléfono"
          maxLength={30}
          onKeyDown={(e) => {
            if (
              e.key === "e" ||
              e.key === "E" ||
              e.key === "+" ||
              e.key === "-" ||
              e.key === "."
            ) {
              e.preventDefault();
            }
          }}
        />

        {/* Campo de entrada para el nombre de usuario */}
        <input
          type="text"
          {...register("username", { required: true, maxLength: 30 })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Usuario"
          maxLength={30}
        />

        {/* Campo de entrada para la contraseña */}
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
          })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Contraseña"
          maxLength={30}
        />

        {/* Mostrar errores de validación */}

        {errors.password && (
          <p>
            La contraseña es requerida, debe tener mínimo 8 caracteres, al menos
            una mayúscula y un caracter especial.
          </p>
        )}

        {/* Botón para enviar el formulario de registro */}
        <button type="submit" className="hover:bg-indigo-600">
          Registrarse
        </button>

        {/* Enlace para iniciar sesión */}
        <div className="login-link">
          <p>
            ¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a>
          </p>
        </div>
      </form>
    </div>
  );
}

// Exportar el componente de la página de registro
export default RegisterPage;
