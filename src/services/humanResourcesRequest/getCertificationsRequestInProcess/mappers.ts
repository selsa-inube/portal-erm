import {
  HumanResourceRequest,
  HumanResourceRequestTraceability,
  TaskToManageHumanResourceRequest,
} from "@src/types/humanResourcesRequest.types";

const statusMapping: Record<string, string> = {
  in_progress: "En progreso",
  finished: "Terminada",
  closed: "Cerrada",
  rejected: "Rechazada",
  canceled: "Cancelada",
};

const typeMapping: Record<string, string> = {
  onboarding: "Vinculación",
  vacations: "Vacaciones",
  certification: "Certificación",
  disability: "Incapacidad",
  leave: "Permiso",
  unpaid_Leave: "Licencia no remunerada",
  leaving_the_Job: "Retiro",
  salary_increase: "Ascenso salarial",
  position_transfer: "Traslado de cargo",
  Absence: "Ausencia",
  pqr: "PQR",
};

const taskStatusMapping: Record<string, string> = {
  Assigned: "Asignada",
  Executed: "Ejecutada",
};

const mapHumanResourceRequestApiToEntity = (
  item: Partial<HumanResourceRequest>,
): HumanResourceRequest => ({
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  humanResourceRequestNumber: String(item.humanResourceRequestNumber ?? ""),
  humanResourceRequestDescription: String(
    item.humanResourceRequestDescription ?? "",
  ),
  humanResourceRequestDate: String(item.humanResourceRequestDate ?? ""),
  humanResourceRequestStatus:
    item.humanResourceRequestStatus &&
    Object.prototype.hasOwnProperty.call(
      statusMapping,
      item.humanResourceRequestStatus,
    )
      ? statusMapping[item.humanResourceRequestStatus]
      : String(item.humanResourceRequestStatus ?? ""),
  humanResourceRequestData: String(item.humanResourceRequestData ?? ""),
  humanResourceRequestType:
    item.humanResourceRequestType &&
    Object.prototype.hasOwnProperty.call(
      typeMapping,
      item.humanResourceRequestType,
    )
      ? typeMapping[item.humanResourceRequestType]
      : String(item.humanResourceRequestType ?? ""),
  employeeId: String(item.employeeId ?? ""),
  userCodeInCharge: String(item.userCodeInCharge ?? ""),
  userNameInCharge: String(item.userNameInCharge ?? ""),
  humanResourceRequestTraceabilities: Array.isArray(
    item.humanResourceRequestTraceabilities,
  )
    ? item.humanResourceRequestTraceabilities.map(
        mapHumanResourceRequestTraceabilityApiToEntity,
      )
    : [],
  tasksToManageTheHumanResourcesRequests: Array.isArray(
    item.tasksToManageTheHumanResourcesRequests,
  )
    ? item.tasksToManageTheHumanResourcesRequests.map(
        mapTaskManagingHumanResourceRequestApiToEntity,
      )
    : [],
});

const mapHumanResourceRequestTraceabilityApiToEntity = (
  item: Partial<HumanResourceRequestTraceability>,
): HumanResourceRequestTraceability => ({
  traceabilityId: String(item.traceabilityId ?? ""),
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  actionExecuted: String(item.actionExecuted ?? ""),
  userWhoExecutedAction: String(item.userWhoExecutedAction ?? ""),
  executionDate: String(item.executionDate ?? ""),
  description: String(item.description ?? ""),
});

const mapTaskManagingHumanResourceRequestApiToEntity = (
  item: Partial<TaskToManageHumanResourceRequest>,
): TaskToManageHumanResourceRequest => ({
  taskManagingId: String(item.taskManagingId ?? ""),
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  taskCode: String(item.taskCode ?? ""),
  taskName: String(item.taskName ?? ""),
  taskStatus:
    item.taskStatus &&
    Object.prototype.hasOwnProperty.call(taskStatusMapping, item.taskStatus)
      ? taskStatusMapping[item.taskStatus]
      : String(item.taskStatus ?? ""),
  description: String(item.description ?? ""),
});

export {
  mapHumanResourceRequestApiToEntity,
  mapHumanResourceRequestTraceabilityApiToEntity,
  mapTaskManagingHumanResourceRequestApiToEntity,
};
