import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:3001/api/' });
//insertar token en headers si es necesario
const token = localStorage.getItem('token');
if (token) {
  API.defaults.headers.common['Authorization'] = `${token}`;
}

export const getEmpleados = async () => {
  const response = await API.get('/empleados');
  return response.data;
};

export const crearEmpleado = async (datosEmpleado: unknown) => {
  const response = await API.post('/empleados', datosEmpleado);
  return response.data;
};

export const actualizarEmpleado = async (
  idEmpleado: string,
  datosEmpleado: unknown
) => {
  try {
    const response = await API.put(`/empleados/${idEmpleado}`, datosEmpleado);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.msg || 'Error de conexión');
    }
    throw new Error('Error de conexión');
  }
};

export const eliminarEmpleado = async (idEmpleado: string) => {
  await API.put(`/empleados/status/${idEmpleado}`);
  return true;
};
