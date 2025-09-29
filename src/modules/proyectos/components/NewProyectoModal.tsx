/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';

// Asume que tienes esta interfaz definida en src/modules/empleados/types/Empleado.ts
// Usamos Omit para excluir el ID, ya que el formulario lo está creando
// type EmpleadoFormulario = Omit<Empleado, 'ID_Empleado'>;

type NewProyectoModalComponentProps = {
  onSubmit: (data: any) => void; // Replace 'any' with your form data type if available
  isMutating: boolean;
};

const NewProyectoModalComponent: React.FC<NewProyectoModalComponentProps> = ({
  onSubmit,
  isMutating,
}) => {
  // Configura RHF. Puedes pasar un 'defaultValues' aquí si fuera un formulario de edición.
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Añadir reset para limpiar el formulario
  } = useForm({
    defaultValues: {
      NombreProyecto: '',
      FechaInicio: '',
      FechaFin: '',
    },
  });

  const onSubmitRHF = (data: any) => {
    onSubmit(data);
    reset();
    const modal = document.getElementById(
      'new-proyecto-modal'
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  return (
    <dialog id="new-proyecto-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Registro de Proyecto</h3>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <form
          onSubmit={handleSubmit(onSubmitRHF)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 m"
        >
          {/* Campo Nombre */}
          <div>
            <label className="label">Nombre del Proyecto</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('NombreProyecto', {
                required: 'El nombre del proyecto es obligatorio',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message:
                    'El nombre del proyecto solo puede contener letras y espacios',
                },
              })}
            />
            {errors.NombreProyecto && (
              <p className="text-red-500 text-sm">
                {errors.NombreProyecto.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">Fecha de Inicio</label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register('FechaInicio', {
                required: 'La fecha de inicio es obligatoria',
              })}
            />
            {errors.FechaInicio && (
              <p className="text-red-500 text-sm">
                {errors.FechaInicio.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">Fecha de Fin</label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register('FechaFin', {
                required: 'La fecha de fin es obligatoria',
              })}
            />
            {errors.FechaFin && (
              <p className="text-red-500 text-sm">{errors.FechaFin.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isMutating}
            className="btn btn-primary col-span-1 sm:col-span-2 w-full mt-6"
          >
            {isMutating ? 'Guardando...' : 'Crear Proyecto'}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default NewProyectoModalComponent;
