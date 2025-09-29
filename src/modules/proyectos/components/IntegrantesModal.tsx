/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { Empleado } from '../../empleados/types/Empleado';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { useProyectos } from '../hooks/useProyectos';

type IntegrantesModalComponentProps = {
  idProyecto?: string;
  integrantes: Empleado[];
};

const IntegrantesModalComponent: React.FC<IntegrantesModalComponentProps> = ({
  integrantes,
  idProyecto,
}) => {
  const { eliminarIntegranteDelProyecto } = useProyectos();
  const handleEliminarIntegrante = async (idEmpleado: string | number) => {
    if (!idProyecto) return;
    try {
      await eliminarIntegranteDelProyecto(idProyecto, String(idEmpleado));
      alert('Integrante eliminado exitosamente');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert('Error al eliminar integrante');
    }
  };
  return (
    <dialog id="integrantes-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Integrantes</h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {integrantes.length === 0 && (
          <div className="py-4 text-center">
            <p>No hay integrantes asignados a este proyecto.</p>
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Integrante</th>

              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {integrantes.map((integrante: Empleado) => (
              <tr className="hover:bg-base-300 " key={integrante.ID_Empleado}>
                <th>{integrante.ID_Empleado}</th>
                <td>
                  {integrante.Nombre} {integrante.ApellidoPaterno}
                </td>
                <td>
                  <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
                    <li>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEliminarIntegrante(integrante.ID_Empleado);
                        }}
                        className="tooltip"
                        data-tip="Eliminar Integrante"
                      >
                        <GroupRemoveIcon />
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </dialog>
  );
};

export default IntegrantesModalComponent;
