import { useState, useEffect, useCallback } from 'react';
import {
  fetchProyectos,
  crearProyecto,
  actualizarProyecto,
  agregarIntegranteProyecto,
  eliminarIntegranteProyecto,
  eliminarProyecto,
} from '../../../api/proyectos';
import type { Proyecto } from '../types/Proyecto';

export const useProyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  const getProyectos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProyectos();
      setProyectos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProyectos();
  }, [getProyectos]);

  const agregarProyecto = async (datosProyecto: Proyecto) => {
    setIsMutating(true);
    try {
      const nuevoProyecto = await crearProyecto(datosProyecto);
      setProyectos((prev) => [...prev, nuevoProyecto]);
      return nuevoProyecto;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new Error(`Error al crear proyecto: ${errorMessage}`);
    } finally {
      setIsMutating(false);
    }
  };

  const editarProyecto = async (
    idProyecto: string,
    datosProyecto: Proyecto
  ) => {
    setIsMutating(true);
    try {
      const proyectoActualizado = await actualizarProyecto(
        idProyecto,
        datosProyecto
      );
      setProyectos((prev) =>
        prev.map((p) =>
          p.ID_Proyecto === idProyecto ? proyectoActualizado : p
        )
      );
      return proyectoActualizado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new Error(`Error al actualizar proyecto: ${errorMessage}`);
    } finally {
      setIsMutating(false);
    }
  };

  const darDeBajaProyecto = async (idProyecto: string) => {
    setIsMutating(true);
    try {
      await eliminarProyecto(idProyecto);
      setProyectos((prev) => prev.filter((p) => p.ID_Proyecto !== idProyecto));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new Error(`Error al eliminar proyecto: ${errorMessage}`);
    } finally {
      setIsMutating(false);
    }
  };

  const agregarIntegranteAlProyecto = async (
    idProyecto: string,
    idEmpleado: string
  ) => {
    setIsMutating(true);
    try {
      const proyectoActualizado = await agregarIntegranteProyecto(
        idProyecto,
        idEmpleado
      );
      console.log(proyectoActualizado);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new Error(`Error al agregar integrante: ${errorMessage}`);
    } finally {
      setIsMutating(false);
    }
  };

  const eliminarIntegranteDelProyecto = async (
    idProyecto: string,
    idEmpleado: string
  ) => {
    setIsMutating(true);
    try {
      await eliminarIntegranteProyecto(idProyecto, idEmpleado);
      setProyectos((prev) =>
        prev.map((p) =>
          p.ID_Proyecto === idProyecto
            ? {
                ...p,
                Integrantes: p.Integrantes.filter(
                  (emp) => emp.ID_Empleado !== Number(idEmpleado)
                ),
              }
            : p
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new Error(`Error al eliminar integrante: ${errorMessage}`);
    } finally {
      setIsMutating(false);
    }
  };

  return {
    proyectos,
    isLoading,
    error,
    isMutating,
    refetchProyectos: getProyectos,
    agregarProyecto,
    editarProyecto,
    darDeBajaProyecto,
    agregarIntegranteAlProyecto,
    eliminarIntegranteDelProyecto,
  };
};
