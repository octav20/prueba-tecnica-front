import axios from 'axios';
import type { Proyecto } from '../modules/proyectos/types/Proyecto';
const API = axios.create({ baseURL: 'http://localhost:3001/api/' });
const token = localStorage.getItem('token');
if (token) {
  API.defaults.headers.common['Authorization'] = `${token}`;
}

export const fetchProyectos = async () => {
  const response = await API.get('/proyectos');
  return response.data;
};

export const crearProyecto = async (datosProyecto: Proyecto) => {
  const response = await API.post('/proyectos', datosProyecto);
  return response.data;
};

export const actualizarProyecto = async (
  idProyecto: string,
  datosProyecto: Proyecto
) => {
  const response = await API.put(`/proyectos/${idProyecto}`, datosProyecto);
  return response.data;
};

export const eliminarProyecto = async (idProyecto: string) => {
  await API.put(`/proyectos/status/${idProyecto}`);
  return true;
};

export const fetchIntegrantesProyecto = async (idProyecto: string) => {
  const response = await API.get(`/proyectos/${idProyecto}/integrantes`);
  return response.data;
};

export const agregarIntegranteProyecto = async (
  idProyecto: string,
  idEmpleado: string
) => {
  const response = await API.post(
    `/proyectos/${idProyecto}/empleados/${idEmpleado}`
  );
  return response.data;
};
export const eliminarIntegranteProyecto = async (
  idProyecto: string,
  idEmpleado: string
) => {
  await API.delete(`/proyectos/${idProyecto}/empleados/${idEmpleado}`);
  return true;
};
