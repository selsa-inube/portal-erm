export interface IOption {
  id: string;
  label: string;
  value: string;
}

export const assignmentOptions: IOption[] = [
  { id: "1", label: "Ascenso salarial", value: "ascenso_salarial" },
  { id: "2", label: "Certificación", value: "certificacion" },
  { id: "3", label: "Incapacidad", value: "incapacidad" },
  { id: "4", label: "Licencia no remunerada", value: "licencia_no_remunerada" },
  { id: "5", label: "Permiso", value: "permiso" },
];

export const statusOptions: IOption[] = [
  { id: "1", label: "Por evaluar", value: "por_evaluar" },
  { id: "2", label: "En progreso", value: "en_progreso" },
  { id: "3", label: "Terminada", value: "terminada" },
];
