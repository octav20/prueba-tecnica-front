import { useState, useEffect, useCallback } from 'react';
import type { Empleado } from '../types/Empleado';
import {
  getEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
} from '../../../api/empleados';

export const useEmpleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  const fetchEmpleados = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEmpleados();
      setEmpleados(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmpleados();
  }, [fetchEmpleados]);

  const agregarEmpleado = async (datosEmpleado: unknown) => {
    setIsMutating(true);
    try {
      const nuevoEmpleado = await crearEmpleado(datosEmpleado);

      setEmpleados((prev) => [...prev, nuevoEmpleado]);

      return nuevoEmpleado;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Error al crear empleado: ${err.message}`);
      } else {
        throw new Error(
          'Error al crear empleado: Ocurrió un error desconocido'
        );
      }
    } finally {
      setIsMutating(false);
    }
  };

  // Función para eliminar
  const removerEmpleado = async (idEmpleado: string | number) => {
    setIsMutating(true);
    try {
      await eliminarEmpleado(String(idEmpleado));

      setEmpleados((prev) =>
        prev.filter((emp) => emp.ID_Empleado !== idEmpleado)
      );
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Error al eliminar empleado: ${err.message}`);
      } else {
        throw new Error(
          'Error al eliminar empleado: Ocurrió un error desconocido'
        );
      }
    } finally {
      setIsMutating(false);
    }
  };

  const editarEmpleado = async (
    idEmpleado: string | number,
    datosEmpleado: unknown
  ) => {
    setIsMutating(true);
    try {
      const empleadoActualizado = await actualizarEmpleado(
        String(idEmpleado),
        datosEmpleado
      );

      setEmpleados((prev) =>
        prev.map((emp) =>
          emp.ID_Empleado === idEmpleado ? empleadoActualizado : emp
        )
      );

      return empleadoActualizado;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        throw new Error(`Error al actualizar empleado: ${err.message}`);
      } else {
        throw new Error(
          'Error al actualizar empleado: Ocurrió un error desconocido'
        );
      }
    } finally {
      setIsMutating(false);
    }
  };

  return {
    empleados,
    isLoading,
    error,
    isMutating,
    refetchEmpleados: fetchEmpleados,
    agregarEmpleado,
    removerEmpleado,
    editarEmpleado,
  };
};
