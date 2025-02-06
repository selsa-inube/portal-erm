import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";

import { IBusinessUnit } from "@src/types/employeePortalBusiness.types";

const mapBusinessUnitsApiToEntity = (
  businessUnit: Record<string, unknown>,
): IBusinessUnit => {
  const toStringSafe = (value: unknown): string => {
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
    return "";
  };

  return {
    abbreviatedName: toStringSafe(businessUnit.abbreviatedName),
    businessUnitPublicCode: toStringSafe(businessUnit.businessUnitPublicCode),
    descriptionUse: toStringSafe(businessUnit.descriptionUse),
    firstMonthOfFiscalYear: toStringSafe(businessUnit.firstMonthOfFiscalYear),
    languageId: toStringSafe(businessUnit.languageId),
    urlLogo: toStringSafe(businessUnit.urlLogo),
  };
};

const getBusinessUnitsForOfficer = async (
  userAccount: string,
  portalPublicCode: string,
): Promise<IBusinessUnit[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchBusinessUnitsForAnOfficer",
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/business-units-portal-staff/${userAccount}/${portalPublicCode}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener las unidades de negocio para el oficial",
          status: res.status,
          data,
        };
      }

      return data.map(mapBusinessUnitsApiToEntity);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          `Todos los intentos fallaron. No se pudieron obtener las unidades de negocio. Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }

      continue;
    }
  }

  return [];
};

export { getBusinessUnitsForOfficer, mapBusinessUnitsApiToEntity };
