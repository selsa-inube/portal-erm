import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useErrorFlag } from "@hooks/useErrorFlag";

export function useDeleteRequest<T>(
  deleteFunction: (id: string) => Promise<unknown>,
  updateStateFunction: (filterFn: (item: T) => boolean) => void,
  successMessage = "La solicitud se canceló correctamente",
  successTitle = "Solicitud cancelada",
  errorMessage = "No se pudo eliminar la solicitud",
  errorTitle = "Error",
) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  useErrorFlag(showFlag, successMessage, successTitle, true);

  const handleDelete = async (
    id: string,
    idField: keyof T = "requestId" as keyof T,
  ) => {
    setIsDeleting(true);
    try {
      await deleteFunction(id);

      updateStateFunction(
        (item: T) => (item[idField] as unknown as string) !== id,
      );

      setShowFlag(false);
      setTimeout(() => setShowFlag(true), 0);

      return true;
    } catch {
      navigate(location.pathname, {
        state: {
          showFlag: true,
          flagTitle: errorTitle,
          flagMessage: errorMessage,
          isSuccess: false,
        },
        replace: true,
      });

      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDelete,
    showFlag,
    setShowFlag,
  };
}
