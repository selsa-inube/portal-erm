import {
  MdLogout,
  MdOutlinePersonOff,
  MdAttachFile,
  MdBeachAccess,
  MdOutlinePersonalInjury,
  MdOutlineHistoryEdu,
  MdOutlineBadge,
  MdPendingActions,
} from "react-icons/md";

import { INav } from "@components/layout/AppPage/types";

const nav: INav = {
  title: "MENU",
  sections: {
    administrate: {
      name: "",
      links: {
        vacations: {
          id: "vacations",
          label: "Vacaciones",
          icon: <MdBeachAccess />,
          path: "/vacations",
        },
        disability: {
          id: "disability",
          label: "Incapacidades",
          icon: <MdOutlinePersonalInjury />,
          path: "/disability",
        },
        absences: {
          id: "absences",
          label: "Ausencias",
          icon: <MdOutlinePersonOff />,
          path: "/absences",
        },
        certificates: {
          id: "certificates",
          label: "Certificados",
          icon: <MdAttachFile />,
          path: "/certificates",
        },
        contracts: {
          id: "contracts",
          label: "Contratos",
          icon: <MdOutlineHistoryEdu />,
          path: "/contracts",
        },
        charges: {
          id: "charges",
          label: "Cargos",
          icon: <MdOutlineBadge />,
          path: "/charges",
        },
        Requests: {
          id: "Requests",
          label: "Solicitudes en tramite",
          icon: <MdPendingActions />,
          path: "/Requests",
        },
      },
    },
  },
};

const userMenu = [
  {
    id: "section",
    title: "",
    links: [
      {
        id: "logout",
        title: "Cerrar sesión",
        path: "/logout",
        iconBefore: <MdLogout />,
      },
    ],
    divider: true,
  },
];

const actions = [
  {
    id: "logout",
    label: "Cerrar sesión",
    icon: <MdLogout />,
    action: () => {
      console.log("logout");
    },
  },
];

export { nav, userMenu, actions };
