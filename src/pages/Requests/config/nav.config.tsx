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
        path: "/Requests",
        label: "Solicitudes en trámite",
        id: "/Requests",
        isActive: true,
      },
    ],
    url: "/",
  },
];

export { RequestsNavConfig };
