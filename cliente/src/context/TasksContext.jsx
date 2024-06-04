import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

// Crear el contexto de tareas
const TaskContext = createContext();



// Hook personalizado para acceder al contexto de tareas
export const useTasks = () => {
  const context = useContext(TaskContext);

  

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

// Proveedor de tareas
export function TaskProvider({ children }) {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);

  const [cart, setCart] = useState([]);

  const addToCart = (task) => {
    setCart([...cart, task]);
  };
  
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((task) => task._id !== id);
    setCart(updatedCart);
  };
  // Función para obtener todas las tareas
  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para crear una nueva tarea
  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  // Función para eliminar una tarea por su ID
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Función para obtener una tarea por su ID
  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Función para actualizar una tarea por su ID
  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
    }
  };

  // Proporcionar el contexto de tareas a los componentes hijos
  return (
    <TaskContext.Provider
      value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask, cart, addToCart, removeFromCart }}
    >
      {children}
    </TaskContext.Provider>
  );
}
