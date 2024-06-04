import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"; // Importar hook de productos
import "./LoginForm.css"; // Importar estilos personalizados
import { useForm } from "react-hook-form"; // Importar hook useForm
import { useNavigate, useParams } from "react-router-dom";

// Definir el componente de la página de formulario de productos
function TaskFormPage() {
  // Utilizar useForm para manejar el formulario y sus valores
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Obtener funciones de productos desde el contexto de productos
  const { createTask, getTask, updateTask } = useTasks();

  // Utilizar useNavigate para la navegación
  const navigate = useNavigate();

  // Obtener parámetros de la URL
  const params = useParams();

  // Cargar el producto si existe el parámetro de ID
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("nombre", task.nombre);
        setValue("descripcion", task.descripcion);
        setValue("precio", task.precio);
        setValue("stock", task.stock);
        setValue("link", task.link);
      }
    }
    loadTask();
  }, [params.id, getTask, setValue]);

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit((data) => {
    // Si existe el parámetro de ID, actualizar el producto, de lo contrario, crear una nueva tarea
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate("/tasks"); // Redireccionar a la lista de productos después de guardar
  });

  // Renderizar el formulario de creación/edición de productos
  return (
    <div className="wrapper bg-zinc-800 max-w-md w-full p-10 rounded-md  mx-auto">
      <form onSubmit={onSubmit}>
        <h1>Registro de Productos</h1>
        {/* Campo de entrada para el nombre */}
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: "El nombre es obligatorio" })}
          autoFocus
          className="input-box w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}
        {/* Campo de entrada para la descripción */}
        <input
          type="text"
          placeholder="Descripcion"
          {...register("descripcion", {
            required: "La descripción es obligatoria",
          })}
          className="input-box w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.descripcion && <p>{errors.descripcion.message}</p>}
        {/* Campo de entrada para el precio */}
        <input
          type="number"
          placeholder="Precio"
          {...register("precio", {
            required: "El precio es obligatorio",
            min: { value: 0, message: "El precio no puede ser menor a 0" },
          })}
          className="input-box w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          step="1"
          min="0"
          onKeyDown={(e) => {
            if (
              e.key === "e" ||
              e.key === "E" ||
              e.key === "0" ||
              e.key === "+" ||
              e.key === "-" ||
              e.key === "."
            ) {
              e.preventDefault();
            }
          }}
        />

        {errors.precio && <p>{errors.precio.message}</p>}
        {/* Campo de entrada para el stock */}
        <input
          type="number"
          placeholder="Stock"
          {...register("stock", {
            required: "El stock es obligatorio",
            min: { value: 1, message: "El stock no puede ser menor a 1" },
          })}
          className="input-box w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          step="1"
          min="1"
          onKeyDown={(e) => {
            if (
              e.key === "e" ||
              e.key === "0" ||
              e.key === "E" ||
              e.key === "+" ||
              e.key === "-" ||
              e.key === "."
            ) {
              e.preventDefault();
            }
          }}
        />

        {errors.stock && <p>{errors.stock.message}</p>}
        {/* Campo de entrada para el link de la imagen */}
        <input
          type="text"
          placeholder="Link Imagen"
          {...register("link", {
            required: "El link de la imagen es obligatorio",
          })}
          className="input-box w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {errors.link && <p>{errors.link.message}</p>}
        {/* Botón para guardar */}
        <button className="btn w-full bg-indigo-500 hover:bg-green-600 px-4 py-2 rounded-md text-white">
          Guardar
        </button>
      </form>
    </div>
  );
}

// Exportar el componente de la página de formulario de productos
export default TaskFormPage;
