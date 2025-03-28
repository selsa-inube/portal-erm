const RequestsNavConfig = [
  {
    id: 1,
    label: "Solicitudes en trámite",
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/requests",
        label: "Solicitudes en trámite",
        id: "/requests",
        isActive: true,
      },
    ],
    url: "/",
  },
  {
    id: 2,
    label: "Trámite de solicitud",
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/requests",
        label: "...",
        id: "/requests",
        isActive: false,
      },
    ],
    url: "/requests",
  },
];

export { RequestsNavConfig };
