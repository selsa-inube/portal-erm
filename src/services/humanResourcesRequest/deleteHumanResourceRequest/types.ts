export interface IHumanResourceRequestTraceability {
  actionExecuted: string;
  description: string;
  executionDate: string;
  humanResourceRequestId: string;
  traceabilityId: string;
  transactionOperation: "Insert";
  userWhoExecutedAction: string;
}

export interface IHumanResourceRequestTask {
  description: string;
  humanResourceRequestId: string;
  taskCode: string;
  taskManagingId: string;
  taskName: string;
  taskStatus: string;
  transactionOperation: "Insert";
}

export interface IDeleteResponse {
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestTraceabilities: IHumanResourceRequestTraceability[];
  removalJustification: string;
  tasksToManageTheHumanResourcesRequests: IHumanResourceRequestTask[];
}
