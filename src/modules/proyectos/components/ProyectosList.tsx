import { useState } from 'react';
// import EditarEmpleadoModalComponent from "./EditarEmpleadoModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProyectos } from '../hooks/useProyectos';
import type { Proyecto } from '../types/Proyecto';
import EditarProyectoModalComponent from './EditarProyectoModal';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import IntegrantesModalComponent from './IntegrantesModal';
import AddIntegranteModalComponent from './AddIntegranteModal';

const ProyectosListComponent = () => {
  const { proyectos, editarProyecto, darDeBajaProyecto, isLoading, error } =
    useProyectos();
  const [proyectoAEditar, setProyectoAEditar] = useState<Proyecto | null>(null);

  if (isLoading) return <div>Cargando proyectos...</div>;

  if (proyectos.length === 0) return <div>No hay proyectos disponibles.</div>;

  const openEditarModal = (proyecto: Proyecto) => {
    setProyectoAEditar(proyecto);
    (
      document.querySelector(
        '#editar-proyecto-modal'
      ) as HTMLDialogElement | null
    )?.showModal();
  };

  const openIntegrantesModal = (proyecto: Proyecto) => {
    setProyectoAEditar(proyecto);
    (
      document.querySelector('#integrantes-modal') as HTMLDialogElement | null
    )?.showModal();
  };

  const openAddIntegranteModal = (proyecto: Proyecto) => {
    setProyectoAEditar(proyecto);
    (
      document.querySelector(
        '#add-integrante-modal'
      ) as HTMLDialogElement | null
    )?.showModal();
  };

  const handleSubmitEdicion = async (data: Proyecto) => {
    if (!proyectoAEditar) return;
    try {
      await editarProyecto(proyectoAEditar.ID_Proyecto, data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este proyecto?')) return;
    try {
      await darDeBajaProyecto(String(id));
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
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre del Proyecto</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((proyecto: Proyecto) => (
              <tr className="hover:bg-base-300 " key={proyecto.ID_Proyecto}>
                <th>{proyecto.ID_Proyecto}</th>
                <td>{proyecto.NombreProyecto}</td>
                <td>{proyecto.FechaInicio}</td>
                <td>{proyecto.FechaFin}</td>
                <td>{proyecto.Estatus ? 'Activo' : 'Inactivo'}</td>
                {proyecto.Estatus && (
                  <td>
                    <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
                      <li>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditarModal(proyecto);
                          }}
                          className="tooltip"
                          data-tip="Editar"
                        >
                          <EditIcon />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(proyecto.ID_Proyecto);
                          }}
                          className="tooltip"
                          data-tip="Eliminar"
                        >
                          <DeleteIcon />
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => openIntegrantesModal(proyecto)}
                          className="tooltip"
                          data-tip="Ver Integrantes"
                        >
                          <SupervisorAccountIcon />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => openAddIntegranteModal(proyecto)}
                          className="tooltip"
                          data-tip="Agregar Integrante"
                        >
                          <GroupAddIcon />
                        </button>
                      </li>
                    </ul>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditarProyectoModalComponent
        onSubmit={handleSubmitEdicion}
        isMutating={false}
        proyectoData={proyectoAEditar || undefined}
      />
      <IntegrantesModalComponent
        idProyecto={proyectoAEditar?.ID_Proyecto}
        integrantes={proyectoAEditar?.Integrantes || []}
      />
      <AddIntegranteModalComponent idProyecto={proyectoAEditar?.ID_Proyecto} />
    </>
  );
};

export default ProyectosListComponent;
