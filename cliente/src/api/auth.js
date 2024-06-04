// Importar la biblioteca Axios desde el archivo local "./axios"
import axios from "./axios";

// Definir la URL base del servidor de la API
const API = 'http://localhost:4000/api';

// Función para realizar una solicitud de registro de usuario
export const registerRequest = user => axios.post(`/register`, user);

// Función para realizar una solicitud de inicio de sesión de usuario
export const loginRequest = user => axios.post(`/login`, user);

// Función para realizar una solicitud de verificación de token de usuario
export const verifyTokenRequet = () => axios.get('/verify');
