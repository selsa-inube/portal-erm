import { useEffect } from "react";
import { useFlag } from "@inubekit/inubekit";

export const useErrorFlag = (flagShown: boolean) => {
  const { addFlag } = useFlag();
  useEffect(() => {
    if (flagShown) {
      addFlag({
        title: "Error",
        description: "Error en la consulta de los datos.",
        appearance: "danger",
        duration: 10000,
      });
    }
  }, [flagShown]);
};
