// Importar la biblioteca Axios
import axios from "axios";

// Crear una instancia de Axios con configuración personalizada
const instance = axios.create({
    // Establecer la URL base del servidor de la API
    baseURL: 'http://localhost:4000/api',
    // Permitir el intercambio de cookies (credenciales) en las solicitudes
    withCredentials: true
});

// Exportar la instancia de Axios personalizada para su uso en otros archivos
export default instance;
