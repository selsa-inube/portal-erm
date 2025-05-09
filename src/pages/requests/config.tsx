import { SectionBackground } from "@components/layout/BoardSection/types";

import { IMockRequests, IOption } from "./types";

const mockRequests: IMockRequests = {
  pending: [
    {
      id: "112312",
      title: "Solicitud de Certificación",
      requestDate: "2024-04-02",
      responsible: "Juan Pérez",
      hasResponsible: true,
      status: "pending",
    },
    {
      id: "56645655642",
      title: "Permiso Especial",
      requestDate: "2025-04-01",
      responsible: "María Gómez",
      hasResponsible: false,
      status: "pending",
    },
  ],
  inProgress: [
    {
      id: "312312",
      title: "Licencia No Remunerada",
      requestDate: "2024-03-28",
      responsible: "Carlos Ramírez",
      hasResponsible: true,
      status: "inProgress",
    },
  ],
  completed: [
    {
      id: "45434",
      title: "Ascenso Salarial",
      requestDate: "2024-03-15",
      responsible: "Ana Torres",
      hasResponsible: true,
      status: "completed",
    },
  ],
};

export const assignmentOptions: IOption[] = [
  { id: "1", label: "Ascenso salarial", value: "Ascenso Salarial" },
  { id: "2", label: "Certificación", value: "Solicitud de Certificación" },
  { id: "3", label: "Incapacidad", value: "incapacidad" },
  { id: "4", label: "Licencia no remunerada", value: "Licencia No Remunerada" },
  { id: "5", label: "Permiso", value: "permiso" },
];

export const statusOptions: IOption[] = [
  { id: "1", label: "Por evaluar", value: "Por evaluar" },
  { id: "2", label: "En progreso", value: "En progreso" },
  { id: "3", label: "Terminada", value: "terminada" },
];

export const boardSections = [
  {
    sectionTitle: "Por evaluar",
    value: "Por evaluar",
    sectionBackground: "gray" as SectionBackground,
    sectionInformation: mockRequests.pending.filter(
      (request) => request.status === "pending",
    ),
  },
  {
    sectionTitle: "En progreso",
    value: "En progreso",
    sectionBackground: "light" as SectionBackground,
    sectionInformation: mockRequests.inProgress.filter(
      (request) => request.status === "inProgress",
    ),
  },
  {
    sectionTitle: "Terminada",
    value: "Terminada",
    sectionBackground: "gray" as SectionBackground,
    sectionInformation: mockRequests.completed.filter(
      (request) => request.status === "completed",
    ),
  },
];
