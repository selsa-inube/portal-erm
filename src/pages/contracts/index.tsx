import { ContractsNavConfig } from "./config/nav.config";
import { ContractsUI } from "./interface";

function Contracts() {
  return (
    <ContractsUI
      appName={ContractsNavConfig[0].label}
      appRoute={ContractsNavConfig[0].crumbs}
      navigatePage={ContractsNavConfig[0].url}
    />
  );
}

export { Contracts };
