interface IOption {
  id: string;
  label: string;
  value: string;
}

interface IRoute {
  path: string;
  label: string;
  id: string;
  isActive?: boolean;
  size?: "large" | "small";
}

export type { IOption, IRoute };
