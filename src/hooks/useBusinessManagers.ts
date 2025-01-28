import { useState, useEffect } from "react";

import {
  IBusinessManager,
  IEmployeePortalByBusinessManager,
} from "@src/types/employeePortalBusiness.types";
import { getBusinessManagerById } from "@services/businessManagers/getBusinessManagerById";

export const useBusinessManagers = (
  portalPublicCode: IEmployeePortalByBusinessManager,
) => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManager>({} as IBusinessManager);
  const [hasError, setHasError] = useState(false);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchBusinessManagers = async () => {
      if (!portalPublicCode?.businessManagerId) return;

      try {
        const fetchedBusinessManagers = await getBusinessManagerById(
          portalPublicCode.businessManagerId,
        );

        if (
          !fetchedBusinessManagers ||
          Object.keys(fetchedBusinessManagers).length === 0
        ) {
          setHasError(true);
          setCodeError(1006);
          return;
        }

        setBusinessManagersData(fetchedBusinessManagers);
      } catch (err) {
        console.error(
          "Error al obtener los datos del gestor de negocios:",
          err,
        );
        setHasError(true);
        setCodeError(1007);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode]);

  return { businessManagersData, hasError, codeError };
};
