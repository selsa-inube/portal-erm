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
import { useLocation } from "react-router-dom";

// Definimos el tipo para NavLink
interface NavLink {
  id: string;
  label: string;
  icon: JSX.Element;
  path: string;
  isActive: boolean;
}

const baseNavLinks = [
  {
    id: "holidays",
    label: "Vacaciones",
    icon: <MdBeachAccess />,
    path: "/holidays",
  },
  {
    id: "disability",
    label: "Incapacidades",
    icon: <MdOutlinePersonalInjury />,
    path: "/disability",
  },
  {
    id: "absences",
    label: "Ausencias",
    icon: <MdOutlinePersonOff />,
    path: "/absences",
  },
  {
    id: "certifications",
    label: "Certificaciones",
    icon: <MdOutlineFilePresent />,
    path: "/certifications",
  },
  {
    id: "contracts",
    label: "Contratos",
    icon: <MdOutlineHistoryEdu />,
    path: "/contracts",
  },
  {
    id: "charges",
    label: "Cargos",
    icon: <MdOutlineBadge />,
    path: "/charges",
  },
  {
    id: "requests",
    label: "Solicitudes en tramite",
    icon: <MdPendingActions />,
    path: "/requests",
  },
];

const noop = () => undefined;

const useNavConfig = () => {
  const location = useLocation();

  const nav = {
    reactPortalId: "portals",
    title: "MENU",
    sections: {
      administrate: {
        name: "",
        links: baseNavLinks.reduce(
          (acc, link) => {
            acc[link.id] = {
              ...link,
              isActive: location.pathname.startsWith(link.path),
            };
            return acc;
          },
          {} as Record<string, NavLink>,
        ),
      },
    },
  };

  return nav;
};

const useNavConfigClone = () => {
  const nav = {
    reactPortalId: "portal",
    title: "MENU",
    sections: [
      {
        isOpen: true,
        onClose: noop,
        onToggle: noop,
        subtitle: "Administrate",
        links: baseNavLinks,
      },
    ],
  };

  return nav;
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

export { useNavConfig, useNavConfigClone, userMenu, actions };
