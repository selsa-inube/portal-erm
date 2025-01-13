import { useState, useEffect } from "react";
import { encrypt } from "@utils/encrypt";
import { staffPortalByBusinessManager } from "@services/staffPortal/StaffPortalByBusinessManager";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";

export const usePortalData = (codeParame: string) => {
  const [portalData, setPortalData] = useState<IStaffPortalByBusinessManager>(
    {} as IStaffPortalByBusinessManager,
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        if (!codeParame) {
          console.error("El parámetro 'codeParame' es inválido:", codeParame);
          setHasError(true);
          return;
        }

        const staffPortalData = await staffPortalByBusinessManager(codeParame);

        if (!staffPortalData || Object.keys(staffPortalData).length === 0) {
          setHasError(true);
          console.log("No se recibieron datos válidos o el objeto está vacío.");
          return;
        }

        const encryptedParamValue = encrypt(codeParame);
        localStorage.setItem("portalCode", encryptedParamValue);

        setPortalData(staffPortalData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setHasError(true);
      }
    };

    void fetchPortalData();
  }, [codeParame]);

  return { portalData, hasError };
};
