import { useEffect, useState } from "react";
import { useFlag } from "@inubekit/flag";

export const useErrorFlag = (hasError: boolean, errorType: string | null) => {
  const [flagShown, setFlagShown] = useState(false);
  const { addFlag } = useFlag();

  useEffect(() => {
    if (hasError && !flagShown && errorType === "api_error") {
      addFlag({
        title: "Error",
        description: "Error en la consulta del código del portal.",
        appearance: "dark",
        duration: 10000,
      });

      setFlagShown(true);
    }
  }, [hasError, errorType, flagShown, addFlag]);

  return flagShown;
};
