import { useParams } from "react-router-dom";
import { Stack } from "@inubekit/inubekit";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { mockPendingTasks, mockCompletedTasks } from "@config/TaskBoard.config";

import { RequestSummary } from "./Components/RequestSummary";
import { TaskBoard } from "./Components/TaskBoard";

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
      <Stack direction="column">
        <RequestSummary requestNumber={id} />
        <TaskBoard
          pendingTasks={mockPendingTasks}
          completedTasks={mockCompletedTasks}
          isResponsible={true}
        />
      </Stack>
    </AppMenu>
  );
}

export { ApplicationProcessUI };
