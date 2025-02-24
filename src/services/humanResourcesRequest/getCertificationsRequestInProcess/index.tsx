import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";
import { mapHumanResourceRequestApiToEntity } from "./mappers";

const getHumanResourceRequests = async (typeRequest: string) => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/human-resources-requests?humanResourceRequestType=${typeRequest}&sort=desc.humanResourceRequestDate`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(
          `Error al obtener las solicitudes de recursos humanos (Status: ${res.status})`,
        );
      }

      const data = await res.json();

      return Array.isArray(data)
        ? data.map((item) => mapHumanResourceRequestApiToEntity(item))
        : [];
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          "Error al obtener las solicitudes de recursos humanos:",
          error,
        );
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener las solicitudes de recursos humanos.",
        );
      }
    }
  }

  return [];
};

export { getHumanResourceRequests };
