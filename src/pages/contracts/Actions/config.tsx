import {
  MdAdd,
  MdOutlineCancel,
  MdUpdate,
  MdOutlineEdit,
} from "react-icons/md";

import { IAction } from "./type";

export const Actions = (
  onClickAdd?: () => void,
  onClickModify?: () => void,
  onClickRenew?: () => void,
  onClickEliminate?: () => void,
): IAction[] => {
  return [
    {
      icon: <MdAdd />,
      appearance: "primary",
      label: "Agregar",
      onClick: onClickAdd,
      isDisabled: true,
    },
    {
      icon: <MdOutlineEdit />,
      appearance: "primary",
      label: "Modificar",
      onClick: onClickModify,
      isDisabled: true,
    },
    {
      icon: <MdUpdate />,
      appearance: "primary",
      label: "Renovar",
      onClick: onClickRenew,
      isDisabled: true,
    },
    {
      icon: <MdOutlineCancel />,
      appearance: "danger",
      label: "Terminar",
      onClick: onClickEliminate,
      isDisabled: true,
    },
  ];
};
