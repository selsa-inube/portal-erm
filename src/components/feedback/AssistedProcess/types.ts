export type Variant = "primary" | "danger" | "success";

export interface IStep {
  id: number;
  label: string;
  description?: string;
}
