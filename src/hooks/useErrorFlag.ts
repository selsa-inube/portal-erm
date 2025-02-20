import { useEffect } from "react";
import { useFlag } from "@inubekit/inubekit";

export const useErrorFlag = (
  flagShown: boolean,
  errorMessage?: string,
  errorTitle?: string,
) => {
  const { addFlag } = useFlag();
  useEffect(() => {
    if (flagShown) {
      addFlag({
        title: errorTitle ?? "Error",
        description: errorMessage ?? "Error en la consulta de los datos.",
        appearance: "danger",
        duration: 10000,
      });
    }
  }, [flagShown, errorMessage, errorTitle]);
};
