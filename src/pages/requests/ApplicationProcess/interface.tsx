import { useState } from "react";
import { useParams } from "react-router-dom";
import { Stack } from "@inubekit/inubekit";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { mockPendingTasks, mockCompletedTasks } from "@config/TaskBoard.config";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";

import { RequestSummary } from "./Components/RequestSummary";
import { TaskBoard } from "./Components/TaskBoard";
import { RequirementsModal } from "./modals/RequirementsModal";

interface ApplicationProcessUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
}

function ApplicationProcessUI(props: ApplicationProcessUIProps) {
  const { appName, appRoute, navigatePage } = props;
  const { id } = useParams<{ id: string }>();
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <Stack direction="column">
        <RequestSummary
          requestNumber={id}
          onSeeRequirements={() => setIsRequirementsModalOpen(true)}
        />
        <TaskBoard
          pendingTasks={mockPendingTasks}
          completedTasks={mockCompletedTasks}
          isResponsible={true}
        />

        {isRequirementsModalOpen && (
          <RequirementsModal
            title="Requisitos"
            buttonLabel="Cerrar"
            requirements={mockRequirements}
            handleClose={() => setIsRequirementsModalOpen(false)}
          />
        )}
      </Stack>
    </AppMenu>
  );
}

export { ApplicationProcessUI };
