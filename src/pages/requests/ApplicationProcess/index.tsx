import { useParams } from "react-router-dom";

import { RequestsNavConfig } from "../config/nav.config";
import { ApplicationProcessUI } from "./interface";

function ApplicationProcess() {
  const { id } = useParams();

  return (
    <ApplicationProcessUI
      appName={RequestsNavConfig[1].label}
      appRoute={[
        ...RequestsNavConfig[1].crumbs,
        {
          path: `/requests/application-process/${id}`,
          label: "Trámite de solicitud",
          id: `/requests/application-process/${id}`,
          isActive: true,
        },
      ]}
      navigatePage={RequestsNavConfig[1].url}
    />
  );
}

export { ApplicationProcess };
