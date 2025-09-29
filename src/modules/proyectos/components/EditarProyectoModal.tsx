/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type EditarProyectoModalComponentProps = {
  onSubmit: (data: any) => void;
  isMutating: boolean;
  proyectoData?: any;
};

const EditarProyectoModalComponent: React.FC<
  EditarProyectoModalComponentProps
> = ({ onSubmit, isMutating, proyectoData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: proyectoData,
  });

  const onSubmitRHF = (data: any) => {
    onSubmit(data);
    reset();
    const modal = document.getElementById(
      'editar-proyecto-modal'
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  useEffect(() => {
    if (proyectoData) {
      reset(proyectoData);
    } else {
      reset({
        NombreProyecto: '',
        FechaInicio: '',
        FechaFin: '',
      });
    }
  }, [proyectoData, reset]);

  return (
    <dialog id="editar-proyecto-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Editar Proyecto</h3>
        <form method="dialog">
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
              })}
            />
            {typeof errors.NombreProyecto?.message === 'string' && (
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
            {typeof errors.FechaInicio?.message === 'string' && (
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
            {typeof errors.FechaFin?.message === 'string' && (
              <p className="text-red-500 text-sm">{errors.FechaFin.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isMutating}
            className="btn btn-primary col-span-1 sm:col-span-2 w-full mt-6"
          >
            {isMutating ? 'Guardando...' : 'Editar Proyecto'}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default EditarProyectoModalComponent;
