import { useState } from 'react';
import { useEmpleados } from '../hooks/useEmpleado';
import type { Empleado } from '../types/Empleado';
import EditarEmpleadoModalComponent from './EditarEmpleadoModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ProyectosModalComponent from './ProyectosModal';

const EmpleadosListComponent = () => {
  const { empleados, editarEmpleado, removerEmpleado, isLoading, error } =
    useEmpleados();
  const [empleadoAEditar, setEmpleadoAEditar] = useState<Empleado | null>(null);

  if (isLoading) return <div>Cargando empleados...</div>;

  if (empleados.length === 0) return <div>No hay empleados disponibles.</div>;

  const openEditarModal = (empleado: Empleado) => {
    setEmpleadoAEditar(empleado);
    (
      document.querySelector(
        '#editar-empleado-modal'
      ) as HTMLDialogElement | null
    )?.showModal();
  };

  const openProyectosModal = (empleado: Empleado) => {
    setEmpleadoAEditar(empleado);
    (
      document.querySelector('#proyectos-modal') as HTMLDialogElement | null
    )?.showModal();
  };
  const handleSubmitEdicion = async (data: unknown) => {
    if (!empleadoAEditar) return;
    try {
      await editarEmpleado(empleadoAEditar.ID_Empleado, data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este empleado?')) return;
    try {
      await removerEmpleado(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        {error && (
          <div className="toast  toast-top toast-end">
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Fecha de Nacimiento</th>
              <th>Fecha de Alta</th>
              <th>Sueldo</th>
              <th>Correo</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado: Empleado) => (
              <tr
                className="hover:bg-base-300 cursor-pointer"
                key={empleado.ID_Empleado}
              >
                <th>{empleado.ID_Empleado}</th>
                <td>{empleado.Nombre}</td>
                <td>{empleado.ApellidoPaterno}</td>
                <td>{empleado.ApellidoMaterno}</td>
                <td>{empleado.FechaNacimiento}</td>
                <td>{empleado.FechaAlta}</td>
                <td>{empleado.Sueldo}</td>
                <td>{empleado.Correo}</td>
                <td>{empleado.Estatus ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
                    <li>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditarModal(empleado);
                        }}
                        className="tooltip"
                        data-tip="Editar"
                      >
                        <EditIcon />
                      </button>
                    </li>
                    {empleado.Estatus && (
                      <li>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(empleado.ID_Empleado);
                          }}
                          className="tooltip"
                          data-tip="Eliminar"
                        >
                          <DeleteIcon />
                        </button>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => openProyectosModal(empleado)}
                        className="tooltip"
                        data-tip="proyectos"
                      >
                        <ListAltIcon />
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditarEmpleadoModalComponent
        onSubmit={handleSubmitEdicion}
        isMutating={false}
        empleadoData={empleadoAEditar || undefined}
      />
      <ProyectosModalComponent
        idEmpleado={empleadoAEditar?.ID_Empleado}
        proyectos={empleadoAEditar?.Proyectos || []}
      />
    </>
  );
};

export default EmpleadosListComponent;
