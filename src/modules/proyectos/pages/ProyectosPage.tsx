import AddIcon from '@mui/icons-material/Add';
import { useProyectos } from '../hooks/useProyectos';
import ProyectosListComponent from '../components/ProyectosList';
import NewProyectoModalComponent from '../components/NewProyectoModal';
import type { Proyecto } from '../types/Proyecto';

const ProyectosPageComponent = () => {
  const openProyectoModal = () => {
    (
      document.querySelector('#new-proyecto-modal') as HTMLDialogElement | null
    )?.showModal();
  };
  const { agregarProyecto, isMutating } = useProyectos();

  const handleCrearProyecto = async (datos: Proyecto) => {
    console.log(datos);
    try {
      await agregarProyecto(datos);
      //recargar la lista de proyectos
      window.location.reload();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(`Error al crear empleado: ${errorMessage}`);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold mb-4">Lista de Proyectos</div>
        <button onClick={openProyectoModal} className="btn btn-soft">
          <AddIcon fontSize="medium" className="mr-2" />
          Agregar Proyecto
        </button>
      </div>
      <ProyectosListComponent />
      <NewProyectoModalComponent
        onSubmit={handleCrearProyecto}
        isMutating={isMutating}
      />
    </div>
  );
};

export default ProyectosPageComponent;
