import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";

interface RequestsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
}

function RequestsUI(props: RequestsUIProps) {
  const { appName, appRoute, navigatePage } = props;

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <></>
    </AppMenu>
  );
}

export { RequestsUI };
