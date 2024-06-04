// Importar la instancia de Axios desde el archivo local "./axios"
import axios from "./axios";

// Función para obtener todas las tareas
export const getTasksRequest = () => axios.get("/tasks");

// Función para obtener una tarea específica por su ID
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);

// Función para crear una nueva tarea
export const createTaskRequest = (task) => axios.post("/tasks", task);

// Función para actualizar una tarea existente por su ID
export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task);

// Función para eliminar una tarea por su ID
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);
