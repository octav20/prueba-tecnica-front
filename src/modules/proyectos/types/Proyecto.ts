import type { Empleado } from '../../empleados/types/Empleado';

export interface Proyecto {
  ID_Proyecto: string;
  NombreProyecto: string;
  FechaInicio: string;
  FechaFin: string;
  Estado: string;
  Integrantes: Array<Empleado>;
  Estatus: boolean;
}
