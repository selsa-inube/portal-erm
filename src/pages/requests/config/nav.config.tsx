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
];

export { RequestsNavConfig };
