import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"; // Importar hook de tareas
import TaskCard from "../components/TaskCard"; // Importar componente de tarjeta de tarea
import Carrito from "../components/Carrito";

// Definir el componente de la página de tareas
function TasksPage() {
  // Obtener funciones y estado de tareas desde el contexto de tareas
  const { getTasks, tasks } = useTasks();

  // Cargar la lista de productos al cargar la página
  useEffect(() => {
    getTasks();
  }, []);

  // Renderizar un mensaje si no hay productos
  if (tasks.length === 0) return <h1>No hay productos</h1>;

  // Renderizar la lista de productos utilizando el componente TaskCard
  return (
    <div>
    <div className="grid grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
    <Carrito/>
    </div>
  );
}

// Exportar el componente de la página de tareas
export default TasksPage;
