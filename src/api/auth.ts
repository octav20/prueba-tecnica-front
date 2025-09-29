// src/api/auth.js

import axios from 'axios';
// Asume que estás usando axios. Configura la URL base de tu backend.
const API = axios.create({ baseURL: 'http://localhost:3001/api/' });

/**
 * Llama al endpoint de login.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>} Los datos del usuario y un token.
 */
export const loginApi = async (
  username: string,
  password: string
): Promise<{ token: string; user: { name: string } }> => {
  try {
    const response = await API.post('/auth/login', {
      nombreUsuario: username,
      contraseña: password,
    });

    // Asume que la respuesta incluye: { token: "...", user: { name: "..." } }
    return response.data;
  } catch (error) {
    // Manejo de errores específicos del backend (credenciales incorrectas, etc.)
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.msg || 'Error de conexión');
    }
    throw new Error('Error de conexión');
  }
};
