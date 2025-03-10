import {
  MdOutlineSchedule,
  MdCancel,
  MdCheckCircle,
  MdOutlineManageAccounts,
} from "react-icons/md";

export const statusConfig = {
  inculado: { color: "success", icon: <MdCheckCircle /> },
  prospecto: { color: "warning", icon: <MdOutlineSchedule /> },
  "en proceso de vinculación": {
    color: "warning",
    icon: <MdOutlineSchedule />,
  },
  "en proceso de retiro": { color: "danger", icon: <MdCancel /> },
  retirado: { color: "danger", icon: <MdCancel /> },
  activo: { color: "success", icon: <MdCheckCircle /> },
  neutral: { color: "primary", icon: <MdOutlineManageAccounts /> },
} as const;

export type StatusKey = keyof typeof statusConfig;
