/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type EditarEmpleadoModalComponentProps = {
  onSubmit: (data: any) => void;
  isMutating: boolean;
  empleadoData?: any;
};

const EditarEmpleadoModalComponent: React.FC<
  EditarEmpleadoModalComponentProps
> = ({ onSubmit, isMutating, empleadoData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: empleadoData,
  });

  useEffect(() => {
    if (empleadoData) {
      reset(empleadoData);
    } else {
      reset({
        Nombre: '',
        ApellidoPaterno: '',
        ApellidoMaterno: '',
        FechaNacimiento: '',
        FechaAlta: new Date().toISOString().split('T')[0],
        Sueldo: 0,
        Correo: '',
      });
    }
  }, [empleadoData, reset]);

  const onSubmitRHF = (data: any) => {
    onSubmit(data);
    reset();
    const modal = document.getElementById(
      'editar-empleado-modal'
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  const validarEdadMinima = (FechaNacimiento: string | number | Date) => {
    if (!FechaNacimiento) return true;
    const fechaNac = new Date(FechaNacimiento);
    const hoy = new Date();
    const fechaLimite = new Date(
      hoy.getFullYear() - 18,
      hoy.getMonth(),
      hoy.getDate()
    );

    return fechaNac <= fechaLimite;
  };

  return (
    <dialog id="editar-empleado-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edicion de Empleado</h3>
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
            <label className="label">Nombre(s)</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('Nombre', {
                required: 'El nombre es obligatorio',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'El nombre solo puede contener letras y espacios',
                },
              })}
            />
            {typeof errors.Nombre?.message === 'string' && (
              <p className="text-red-500 text-sm">{errors.Nombre.message}</p>
            )}
          </div>

          {/* Campo Apellido Paterno (ejemplo) */}
          <div>
            <label className="label">Apellido Paterno</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('ApellidoPaterno', {
                required: 'El apellido paterno es obligatorio',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message:
                    'El apellido paterno solo puede contener letras y espacios',
                },
              })}
            />
            {typeof errors.ApellidoPaterno?.message === 'string' && (
              <p className="text-red-500 text-sm">
                {errors.ApellidoPaterno.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">Apellido Materno</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('ApellidoMaterno', {
                required: 'El apellido materno es obligatorio',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message:
                    'El apellido materno solo puede contener letras y espacios',
                },
              })}
            />
            {typeof errors.ApellidoMaterno?.message === 'string' && (
              <p className="text-red-500 text-sm">
                {errors.ApellidoMaterno.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">Correo</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register('Correo', {
                required: 'El Correo es obligatorio',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'El Correo no es válido',
                },
              })}
            />
            {typeof errors.Correo?.message === 'string' && (
              <p className="text-red-500 text-sm">{errors.Correo.message}</p>
            )}
          </div>
          <div>
            <label className="label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="input input-bordered w-full"
              // Puedes mantener el 'min' de HTML para el selector visual, pero no es obligatorio.
              max={
                new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                  .toISOString()
                  .split('T')[0]
              }
              {...register('FechaNacimiento', {
                required: 'La fecha de nacimiento es obligatoria',
                validate: (value) =>
                  validarEdadMinima(value) ||
                  'El empleado debe tener al menos 18 años.',
              })}
            />
            {typeof errors.FechaNacimiento?.message === 'string' && (
              <p className="text-red-500 text-sm">
                {errors.FechaNacimiento.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">Fecha de alta</label>
            <input
              type="date"
              className="input input-bordered w-full"
              readOnly
              value={new Date().toISOString().split('T')[0]}
            />
          </div>
          {/* Campo Sueldo */}
          <div>
            <label className="label">Sueldo</label>
            <input
              type="number"
              className="input  w-full"
              placeholder="0.00"
              {...register('Sueldo', {
                required: 'El Sueldo es obligatorio',
                min: { value: 1, message: 'El Sueldo debe ser mayor a cero' },
                valueAsNumber: true, // Convierte el valor a número automáticamente
              })}
            />
            {typeof errors.Sueldo?.message === 'string' && (
              <p className="text-red-500 text-sm">{errors.Sueldo.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isMutating}
            className="btn btn-primary col-span-1 sm:col-span-2 w-full mt-6"
          >
            {isMutating ? 'Guardando...' : 'Editar Empleado'}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default EditarEmpleadoModalComponent;
