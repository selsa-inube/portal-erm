export interface HumanResourceRequestTraceability {
  actionExecuted: string;
  description: string;
  executionDate: string;
  humanResourceRequestId: string;
  traceabilityId: string;
  userWhoExecutedAction: string;
}

export interface TaskToManageHumanResourceRequest {
  description: string;
  humanResourceRequestId: string;
  taskCode: string;
  taskManagingId: string;
  taskName: string;
  taskStatus: string;
}

export interface HumanResourceRequest {
  employeeId: string;
  humanResourceRequestData: string;
  humanResourceRequestDate: string;
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: string;
  humanResourceRequestTraceabilities: HumanResourceRequestTraceability[];
  humanResourceRequestType: string;
  tasksToManageTheHumanResourcesRequests: TaskToManageHumanResourceRequest[];
  userCodeInCharge: string;
  userNameInCharge: string;
}

export type HumanResourceRequests = HumanResourceRequest[];
