import { RequestsNavConfig } from "./config/nav.config";
import { RequestsUI } from "./interface";

function Requests() {
  return (
    <RequestsUI
      appName={RequestsNavConfig[0].label}
      appRoute={RequestsNavConfig[0].crumbs}
      navigatePage={RequestsNavConfig[0].url}
    />
  );
}

export { Requests };
