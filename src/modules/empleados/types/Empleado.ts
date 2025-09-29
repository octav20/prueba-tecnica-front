import type { Proyecto } from '../../proyectos/types/Proyecto';

export interface Empleado {
  ID_Empleado: number | string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  FechaNacimiento: string;
  FechaAlta: string;
  Sueldo: number;
  Estatus: number;
  Correo: string;
  Proyectos?: Array<Proyecto>;
}
