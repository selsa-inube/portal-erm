import { IOption } from "@inubekit/inubekit";
export interface FormValues {
  assignment: string;
  status: string;
  value: number;
  filters?: IOption[];
}
