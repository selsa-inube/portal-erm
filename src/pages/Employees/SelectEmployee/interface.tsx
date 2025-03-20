import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import * as Yup from "yup";
import { useAllEmployees } from "@hooks/useEmployeeConsultation";
import { useAppContext } from "@context/AppContext";

interface EmployeeOption {
  id: string;
  label: string;
  value: string;
}

export const useSelectEmployee = () => {
  const { employees: fetchedEmployees, loading, error } = useAllEmployees();
  const { employees, setEmployees, setSelectedEmployee } = useAppContext();
  const [selectedOption, setSelectedOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (fetchedEmployees.length > 0 && fetchedEmployees !== employees) {
      setEmployees(fetchedEmployees);
    }
  }, [fetchedEmployees, employees, setEmployees]);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("selectedEmployeeId");
    if (storedEmployeeId) {
      const existingEmployee = employees.find(
        (emp) => emp.employeeId === storedEmployeeId,
      );
      if (existingEmployee) {
        setSelectedOption(
          `${existingEmployee.identificationDocumentNumber} - ${existingEmployee.names}`,
        );
        setSelectedEmployee(existingEmployee);
      }
    }
  }, [employees, setSelectedEmployee]);

  const normalizeString = (str: string | undefined) =>
    (str ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredOptions: EmployeeOption[] = employees
    .map((emp) => ({
      id: emp.employeeId,
      label: normalizeString(
        `${emp.identificationDocumentNumber} - ${emp.names}`,
      ),
      value: normalizeString(
        `${emp.identificationDocumentNumber} - ${emp.names}`,
      ),
    }))
    .filter((opt) => opt.label.includes(normalizeString(searchValue)));

  const showNoResults = searchValue.length > 0 && filteredOptions.length === 0;

  const employeeOptions =
    searchValue.length > 0 && filteredOptions.length === 0
      ? [
          {
            id: "no-results",
            label: "No hay resultados para esta búsqueda.",
            value: "no-results",
          },
        ]
      : filteredOptions;

  const validationSchema = Yup.object({
    employee: Yup.string()
      .required("Para continuar, primero debes seleccionar un empleado.")
      .oneOf(
        employeeOptions.map((opt) => opt.value),
        "Debes seleccionar una opción válida.",
      ),
  });

  const handleSubmit = (values: { employee: string }) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const selectedEmployeeOption = employeeOptions.find(
        (opt) => opt.value === values.employee,
      );

      if (selectedEmployeeOption) {
        const fullEmployee = employees.find(
          (emp) => emp.employeeId === selectedEmployeeOption.id,
        );

        if (fullEmployee) {
          setSelectedEmployee(fullEmployee);
          localStorage.setItem("selectedEmployeeId", fullEmployee.employeeId);
          navigate("/");
        } else {
          console.error("Empleado no encontrado en la lista completa.");
        }
      } else {
        console.error("Empleado no encontrado");
      }

      setIsSubmitting(false);
    }, 1500);
  };

  return {
    employeeOptions,
    showNoResults,
    loading,
    error,
    selectedOption,
    setSelectedOption,
    searchValue,
    setSearchValue,
    isMobile,
    isSubmitting,
    validationSchema,
    handleSubmit,
  };
};
