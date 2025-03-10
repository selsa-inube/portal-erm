import { mockAlertCards } from "@mocks/requirements/requirements-2.mock";

import { UnmetRequirementsFormUI } from "./interface";

interface UnmetRequirementsFormProps {
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function UnmetRequirementsForm(props: UnmetRequirementsFormProps) {
  const { withNextButton, handleNextStep, handlePreviousStep } = props;
  return (
    <UnmetRequirementsFormUI
      alertCards={mockAlertCards}
      withNextButton={withNextButton}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
    />
  );
}

export { UnmetRequirementsForm };
export type { UnmetRequirementsFormProps };
