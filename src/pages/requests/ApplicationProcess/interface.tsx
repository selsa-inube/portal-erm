import { useParams } from "react-router-dom";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";

import { RequestSummary } from "./Components/RequestSummary";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
}

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const { appName, appRoute, navigatePage } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <RequestSummary requestNumber={id} />
    </AppMenu>
  );
}

export { ApplicationProcessUI };
