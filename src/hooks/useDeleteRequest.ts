import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useErrorFlag } from "@hooks/useErrorFlag";
import { IDeleteResponse } from "@services/humanResourcesRequest/deleteHumanResourceRequest/types";
import { deleteHumanResourceRequest } from "@services/humanResourcesRequest/deleteHumanResourceRequest";

export function useDeleteRequest<T extends { requestId?: string }>(
  updateStateFunction: (filterFn: (item: T) => boolean) => void,
) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  useErrorFlag(
    showFlag,
    "La solicitud se canceló correctamente",
    "Solicitud cancelada",
    true,
  );

  const createRequestBody = (
    id: string,
    justification = "",
    description = "",
  ): IDeleteResponse => ({
    removeHumanResourcesRequest: [
      {
        humanResourceRequestDescription: description,
        humanResourceRequestId: id,
        humanResourceRequestNumber: id,
        removalJustification: justification,
      },
    ],
  });

  const handleDelete = async (
    id: string,
    justification?: string,
    description?: string,
    idField: keyof T = "requestId",
  ) => {
    setIsDeleting(true);
    try {
      await deleteHumanResourceRequest(
        createRequestBody(id, justification, description),
      );
      updateStateFunction((item: T) => item[idField] !== id);
      setShowFlag(false);
      setTimeout(() => setShowFlag(true), 0);
      return true;
    } catch {
      navigate(location.pathname, {
        state: {
          showFlag: true,
          flagTitle: "Error",
          flagMessage: "No se pudo eliminar la solicitud",
          isSuccess: false,
        },
        replace: true,
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, handleDelete, showFlag, setShowFlag };
}
