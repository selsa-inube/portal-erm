import { useState, useEffect, useCallback } from "react";
import { getAllEmployees } from "@services/employeeConsultation";
import { Employee } from "@ptypes/employeePortalConsultation.types";

interface UseAllEmployeesResult {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetch: (page?: number, perPage?: number) => void;
}

const useAllEmployees = (
  initialPage = 1,
  initialPerPage = 50,
): UseAllEmployeesResult => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);

  const fetchEmployees = useCallback(
    async (fetchPage = page, fetchPerPage = perPage) => {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllEmployees(fetchPage, fetchPerPage);
        setEmployees(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error desconocido al obtener la lista de empleados",
        );
      } finally {
        setLoading(false);
      }
    },
    [page, perPage],
  );

  useEffect(() => {
    fetchEmployees();
  }, [page, perPage, fetchEmployees]);

  const refetch = (newPage = page, newPerPage = perPage) => {
    setPage(newPage);
    setPerPage(newPerPage);
    fetchEmployees(newPage, newPerPage);
  };

  return { employees, loading, error, refetch };
};

export default useAllEmployees;
