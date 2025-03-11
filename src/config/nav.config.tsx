import {
  MdLogout,
  MdOutlinePersonOff,
  MdOutlineFilePresent,
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
        holidays: {
          id: "holidays",
          label: "Vacaciones",
          icon: <MdBeachAccess />,
          path: "/holidays",
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
        certifications: {
          id: "certifications",
          label: "Certificaciones",
          icon: <MdOutlineFilePresent />,
          path: "/certifications",
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
      window.location.href = "/logout";
    },
  },
];

export { nav, userMenu, actions };
