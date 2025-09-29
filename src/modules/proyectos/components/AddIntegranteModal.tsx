/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { Empleado } from '../../empleados/types/Empleado';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useEmpleados } from '../../empleados/hooks/useEmpleado';
import { useProyectos } from '../hooks/useProyectos';

type AddIntegranteModalComponentProps = {
  idProyecto?: string;
};

const AddIntegranteModalComponent: React.FC<
  AddIntegranteModalComponentProps
> = ({ idProyecto }) => {
  const { empleados } = useEmpleados();
  const { agregarIntegranteAlProyecto } = useProyectos();

  const handleAgregarIntegrante = async (idEmpleado: string | number) => {
    if (!idProyecto) return;
    try {
      await agregarIntegranteAlProyecto(idProyecto, String(idEmpleado));
      alert('Integrante agregado exitosamente');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert('Error al agregar integrante');
    }
  };

  return (
    <dialog id="add-integrante-modal" className="modal ">
      <div className="modal-box h-80">
        <h3 className="font-bold text-lg">Agregar Integrante</h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {empleados.length === 0 && (
          <div className="py-4 text-center">
            <p>No hay empleados disponibles.</p>
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
            {empleados.map((integrante: Empleado) => (
              <tr className="hover:bg-base-300 " key={integrante.ID_Empleado}>
                <th>{integrante.ID_Empleado}</th>
                <td>
                  {integrante.Nombre} {integrante.ApellidoPaterno}
                </td>
                <td>
                  <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
                    <li>
                      <button
                        onClick={() =>
                          handleAgregarIntegrante(integrante.ID_Empleado)
                        }
                        className="tooltip"
                        data-tip="Agregar Integrante"
                      >
                        <GroupAddIcon />
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

export default AddIntegranteModalComponent;
