import { useEffect } from "react";
import { useFlag } from "@inubekit/inubekit";

export const useErrorFlag = (flagShown: boolean, errorMessage?: string) => {
  const { addFlag } = useFlag();
  useEffect(() => {
    if (flagShown) {
      addFlag({
        title: "Error",
        description: errorMessage ?? "Error en la consulta de los datos.",
        appearance: "danger",
        duration: 10000,
      });
    }
  }, [flagShown, errorMessage]);
};
