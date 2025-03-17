import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";

interface ContractsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
}

function ContractsUI(props: ContractsUIProps) {
  const { appName, appRoute, navigatePage } = props;

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <></>
    </AppMenu>
  );
}

export { ContractsUI };
