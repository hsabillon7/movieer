import axios from "axios";
import getEnvVars from "../../enviroment";

const { apiUrl } = getEnvVars();

// Crear una instancia de conexión
const instance = axios.create({
    baseURL: apiUrl
});

export default instance;