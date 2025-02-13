import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";
import { IHolidaysInProcess } from "@ptypes/holidays.types";
import {
  mapHolidaysInProcessApiToEntities,
  mapHolidaysInProcessApiToEntity,
} from "./mappers";

const getHolidaysRequestInProcess = async (
  employeeId: string,
): Promise<IHolidaysInProcess[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  const queryParams = new URLSearchParams({
    employee_id: employeeId,
    human_resource_request_type: "vacations",
  });

  const url = `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/vacation-history?${queryParams.toString()}`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(url, options);

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener el historial de vacaciones",
          status: res.status,
          data,
        };
      }

      let normalizedHolidaysInProcess: IHolidaysInProcess[] = [];
      if (Array.isArray(data)) {
        normalizedHolidaysInProcess = mapHolidaysInProcessApiToEntities(data);
      } else if (data && typeof data === "object") {
        normalizedHolidaysInProcess = [mapHolidaysInProcessApiToEntity(data)];
      }

      return normalizedHolidaysInProcess;
    } catch (error) {
      if (attempt === maxRetries) {
        console.error("Error al obtener las solicitudes de vacaciones:", error);
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener el historial de vacaciones.",
        );
      }
    }
  }

  return [];
};

export { getHolidaysRequestInProcess };
