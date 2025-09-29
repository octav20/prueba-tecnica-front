import EmpleadosListComponent from '../components/EmpleadosList';
import EmpleadoModalComponent from '../components/EmpleadoModal';
import AddIcon from '@mui/icons-material/Add';
import { useEmpleados } from '../hooks/useEmpleado';

const EmpleadosPageComponent = () => {
  const openEmpleadoModal = () => {
    (
      document.querySelector('#empleado-modal') as HTMLDialogElement | null
    )?.showModal();
  };
  const { agregarEmpleado, isMutating } = useEmpleados();

  const handleCrearEmpleado = async (datos: unknown) => {
    console.log(datos);
    try {
      await agregarEmpleado(datos);
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
        <div className="text-2xl font-bold mb-4">Lista de Empleados</div>
        <button onClick={openEmpleadoModal} className="btn btn-soft">
          <AddIcon fontSize="medium" className="mr-2" />
          Agregar Empleado
        </button>
      </div>
      <EmpleadosListComponent />
      <EmpleadoModalComponent
        onSubmit={handleCrearEmpleado}
        isMutating={isMutating}
      />
    </div>
  );
};

export default EmpleadosPageComponent;
