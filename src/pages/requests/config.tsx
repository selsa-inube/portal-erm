import { SectionBackground } from "@components/layout/BoardSection/types";
import { IOption } from "./types";

const mockRequests = {
  pending: [
    {
      id: "112312",
      title: "Solicitud de Certificación",
      requestDate: "2024-04-02",
      responsible: "Juan Pérez",
      hasResponsible: true,
    },
    {
      id: "56645655642",
      title: "Permiso Especial",
      requestDate: "2025-04-01",
      responsible: "María Gómez",
      hasResponsible: false,
    },
  ],
  inProgress: [
    {
      id: "312312",
      title: "Licencia No Remunerada",
      requestDate: "2024-03-28",
      responsible: "Carlos Ramírez",
      hasResponsible: true,
    },
  ],
  completed: [
    {
      id: "45434",
      title: "Ascenso Salarial",
      requestDate: "2024-03-15",
      responsible: "Ana Torres",
      hasResponsible: true,
    },
  ],
};

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

export const boardSections = [
  {
    sectionTitle: "Por evaluar",
    sectionBackground: "gray" as SectionBackground,
    sectionInformation: mockRequests.pending,
  },
  {
    sectionTitle: "En progreso",
    sectionBackground: "light" as SectionBackground,
    sectionInformation: mockRequests.inProgress,
  },
  {
    sectionTitle: "Terminada",
    sectionBackground: "gray" as SectionBackground,
    sectionInformation: mockRequests.completed,
  },
];
