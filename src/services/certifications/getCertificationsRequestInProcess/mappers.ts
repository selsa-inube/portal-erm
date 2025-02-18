import {
  HumanResourceRequest,
  HumanResourceRequestTraceability,
  TaskManagingHumanResourceRequest,
} from "@ptypes/certifications.types";

const mapHumanResourceRequestApiToEntity = (
  item: Partial<HumanResourceRequest>,
): HumanResourceRequest => ({
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
  human_resource_request_data: String(item.human_resource_request_data ?? ""),
  human_resource_request_type: String(item.human_resource_request_type ?? ""),
  employee_id: String(item.employee_id ?? ""),
  user_code_in_charge: String(item.user_code_in_charge ?? ""),
  user_name_in_charge: String(item.user_name_in_charge ?? ""),
});

const mapHumanResourceRequestTraceabilityApiToEntity = (
  items: Partial<HumanResourceRequestTraceability>[] = [],
): HumanResourceRequestTraceability[] =>
  items.map((item) => ({
    traceability_id: String(item.traceability_id ?? ""),
    human_resource_request_id: String(item.human_resource_request_id ?? ""),
    action_executed: String(item.action_executed ?? ""),
    user_who_executed_action: String(item.user_who_executed_action ?? ""),
    execution_date: String(item.execution_date ?? ""),
    description: String(item.description ?? ""),
  }));

const mapTaskManagingHumanResourceRequestApiToEntity = (
  items: Partial<TaskManagingHumanResourceRequest>[] = [],
): TaskManagingHumanResourceRequest[] =>
  items.map((item) => ({
    task_managing_id: String(item.task_managing_id ?? ""),
    human_resource_request_id: String(item.human_resource_request_id ?? ""),
    task_code: String(item.task_code ?? ""),
    task_name: String(item.task_name ?? ""),
    task_status: String(item.task_status ?? ""),
  }));

export {
  mapHumanResourceRequestApiToEntity,
  mapHumanResourceRequestTraceabilityApiToEntity,
  mapTaskManagingHumanResourceRequestApiToEntity,
};
