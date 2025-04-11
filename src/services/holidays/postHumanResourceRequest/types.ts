export enum RequestStatus {
  IN_PROGRESS = "in_progress",
  FINISHED = "finished",
  CLOSED = "closed",
  REJECTED = "rejected",
  CANCELED = "cancele",
}

export const RequestStatusLabel: Record<RequestStatus, string> = {
  [RequestStatus.IN_PROGRESS]: "En progreso",
  [RequestStatus.FINISHED]: "Terminada",
  [RequestStatus.CLOSED]: "Cerrada",
  [RequestStatus.REJECTED]: "Rechazada",
  [RequestStatus.CANCELED]: "Cancelada",
};

export enum HumanResourceRequestType {
  onboarding = "Vinculación",
  vacations = "Vacaciones",
  certification = "Certificacion",
  disability = "Incapacidad",
  leave = "Permiso",
  unpaid_Leave = "Licencia no remunerada",
  leaving_the_Job = "Retiro",
  salary_increase = "Ascenso salarial",
  position_transfer = "Traslado de cargo",
  Absence = "Ausencia",
  pqr = "PQR",
}

export interface IHumanResourceRequestData {
  daysOff: string;
  startDate: string;
  contract: string;
}

export interface IRequestBody {
  employeeId: string;
  humanResourceRequestData: string;
  humanResourceRequestDate: string;
  humanResourceRequestDescription: string;
  humanResourceRequestStatus: string;
  humanResourceRequestType: string;
  userCodeInCharge: string;
  userNameInCharge: string;
}

export interface IHumanResourceResponseData {
  requestId: string;
  timestamp: string;
}

export interface IHumanResourceResponse {
  status: string;
  message: string;
  data: IHumanResourceResponseData;
}
