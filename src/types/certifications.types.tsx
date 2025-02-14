export interface HumanResourceRequest {
  human_resource_request_id: string;
  human_resource_request_number: string;
  human_resource_request_description: string;
  human_resource_request_date: string;
  human_resource_request_status: string;
  human_resource_request_data: Record<string, unknown>;
  human_resource_request_type: string;
  employee_id: string;
  user_code_in_charge: string;
  user_name_in_charge: string;
}

export interface HumanResourceRequestTraceability {
  traceability_id: string;
  human_resource_request_id: string;
  action_executed: string;
  user_who_executed_action: string;
  execution_date: string;
  description: string;
}

export interface TaskManagingHumanResourceRequest {
  task_managing_id: string;
  human_resource_request_id: string;
  task_code: string;
  task_name: string;
  task_status: string;
}

export interface HumanResourceData {
  human_resource_request: HumanResourceRequest;
  human_resource_request_traceability: HumanResourceRequestTraceability;
  tasks_to_manage_the_human_resources_request: TaskManagingHumanResourceRequest;
}
