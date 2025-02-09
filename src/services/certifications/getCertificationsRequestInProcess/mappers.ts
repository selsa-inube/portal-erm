import {
  HumanResourceRequest,
  HumanResourceRequestTraceability,
  TaskManagingHumanResourceRequest,
} from "@ptypes/certifications.types";

interface HumanResourceRequestApi {
  human_resource_request_id?: string;
  human_resource_request_number?: string;
  human_resource_request_description?: string;
  human_resource_request_date?: string;
  human_resource_request_status?: string;
  human_resource_request_data?: Record<string, unknown>;
  human_resource_request_type?: string;
  employee_id?: string;
  user_code_in_charge?: string;
  user_name_in_charge?: string;
}

interface HumanResourceRequestTraceabilityApi {
  traceability_id?: string;
  human_resource_request_id?: string;
  action_executed?: string;
  user_who_executed_action?: string;
  execution_date?: string;
  description?: string;
}

interface TaskManagingHumanResourceRequestApi {
  task_managing_id?: string;
  human_resource_request_id?: string;
  task_code?: string;
  task_name?: string;
  task_status?: string;
}

const mapHumanResourceRequestApiToEntity = (
  item: HumanResourceRequestApi,
): HumanResourceRequest => {
  return {
    human_resource_request_id: String(item.human_resource_request_id ?? ""),
    human_resource_request_number: String(
      item.human_resource_request_number ?? "",
    ),
    human_resource_request_description: String(
      item.human_resource_request_description ?? "",
    ),
    human_resource_request_date: String(item.human_resource_request_date ?? ""),
    human_resource_request_status: String(
      item.human_resource_request_status ?? "",
    ),
    human_resource_request_data: item.human_resource_request_data ?? {},
    human_resource_request_type: String(item.human_resource_request_type ?? ""),
    employee_id: String(item.employee_id ?? ""),
    user_code_in_charge: String(item.user_code_in_charge ?? ""),
    user_name_in_charge: String(item.user_name_in_charge ?? ""),
  };
};

const mapHumanResourceRequestTraceabilityApiToEntity = (
  item: HumanResourceRequestTraceabilityApi,
): HumanResourceRequestTraceability => {
  return {
    traceability_id: String(item.traceability_id ?? ""),
    human_resource_request_id: String(item.human_resource_request_id ?? ""),
    action_executed: String(item.action_executed ?? ""),
    user_who_executed_action: String(item.user_who_executed_action ?? ""),
    execution_date: String(item.execution_date ?? ""),
    description: String(item.description ?? ""),
  };
};

const mapTaskManagingHumanResourceRequestApiToEntity = (
  item: TaskManagingHumanResourceRequestApi,
): TaskManagingHumanResourceRequest => {
  return {
    task_managing_id: String(item.task_managing_id ?? ""),
    human_resource_request_id: String(item.human_resource_request_id ?? ""),
    task_code: String(item.task_code ?? ""),
    task_name: String(item.task_name ?? ""),
    task_status: String(item.task_status ?? ""),
  };
};

export {
  mapHumanResourceRequestApiToEntity,
  mapHumanResourceRequestTraceabilityApiToEntity,
  mapTaskManagingHumanResourceRequestApiToEntity,
};
