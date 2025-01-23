import { useState, useEffect } from "react";
import { encrypt } from "@utils/encrypt";
import { staffPortalByBusinessManager } from "@services/staffPortal/StaffPortalByBusinessManager";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";

import { useErrorFlag } from "./useErrorFlag";

export const usePortalData = (codeParame: string) => {
  const [portalData, setPortalData] = useState<IStaffPortalByBusinessManager>(
    {} as IStaffPortalByBusinessManager,
  );
  const [hasError, setHasError] = useState(true);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const flagShown = useErrorFlag(hasError, errorType);

  useEffect(() => {
    const fetchPortalData = async () => {
      setIsFetching(true);

      try {
        if (!codeParame) {
          console.error("El parámetro 'codeParame' es inválido:", codeParame);
          setHasError(true);
          setErrorType("invalid_param");
          return;
        }

        const staffPortalData = await staffPortalByBusinessManager(codeParame);

        if (!staffPortalData || Object.keys(staffPortalData).length === 0) {
          setHasError(true);
          setErrorType("no_data");
          console.log("No se recibieron datos válidos o el objeto está vacío.");
          return;
        }

        const encryptedParamValue = encrypt(codeParame);
        localStorage.setItem("portalCode", encryptedParamValue);
        setHasError(false);
        setPortalData(staffPortalData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setHasError(true);
        setErrorType("api_error");
      } finally {
        setIsFetching(false);
      }
    };

    void fetchPortalData();
  }, [codeParame]);

  return { portalData, hasError, errorType, isFetching, flagShown };
};
