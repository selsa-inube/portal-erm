import { MdOutlineSchedule, MdCancel, MdCheckCircle } from "react-icons/md";

export const statusConfig = {
  prospecto: { color: "warning", icon: <MdOutlineSchedule /> },
  "en proceso de vinculación": {
    color: "warning",
    icon: <MdOutlineSchedule />,
  },
  "en proceso de retiro": { color: "danger", icon: <MdCancel /> },
  retirado: { color: "danger", icon: <MdCancel /> },
  activo: { color: "success", icon: <MdCheckCircle /> },
} as const;

export type StatusKey = keyof typeof statusConfig;
