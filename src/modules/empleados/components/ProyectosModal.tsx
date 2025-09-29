/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { Proyecto } from '../../proyectos/types/Proyecto';

type ProyectosModalComponentProps = {
  idEmpleado?: string | number;
  proyectos: Proyecto[];
};

const ProyectosModalComponent: React.FC<ProyectosModalComponentProps> = ({
  idEmpleado,
  proyectos,
}) => {
  return (
    <dialog id="proyectos-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Proyectos del empleado {idEmpleado}
        </h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {proyectos.length === 0 && (
          <div className="py-4 text-center">
            <p>No hay proyectos asignados a este empleado.</p>
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del proyecto</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((proyecto: Proyecto) => (
              <tr className="hover:bg-base-300 " key={proyecto.ID_Proyecto}>
                <th>{proyecto.ID_Proyecto}</th>
                <td>{proyecto.NombreProyecto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </dialog>
  );
};

export default ProyectosModalComponent;
