import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
}

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const { appName, appRoute, navigatePage } = props;

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <></>
    </AppMenu>
  );
}

export { ApplicationProcessUI };
