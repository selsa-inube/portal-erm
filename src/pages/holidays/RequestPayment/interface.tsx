import { useState } from "react";
import { FormikProps } from "formik";
import {
  Stack,
  Assisted,
  IAssistedStep,
  useMediaQuery,
  Button,
} from "@inubekit/inubekit";
import { MdCheckCircleOutline } from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";
import { RequirementsModal } from "@pages/Employees/NewEmployee/modals/RequirementsModal";
import { mockAlertCards } from "@mocks/requirements/requirements.mock";

import { GeneralInformationForm } from "./forms/GeneralInformationForm";
import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { VerificationForm } from "./forms/VerificationForm";
import { AlertCardStep } from "./forms/RequirementsForm";

interface RequestPaymentUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  steps: IAssistedStep[];
  currentStep: number;
  generalInformationRef: React.RefObject<FormikProps<IGeneralInformationEntry>>;
  initialGeneralInformationValues: IGeneralInformationEntry;
  isCurrentFormValid: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
}

function RequestPaymentUI(props: RequestPaymentUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    steps,
    currentStep,
    generalInformationRef,
    initialGeneralInformationValues,
    isCurrentFormValid,
    setCurrentStep,
    setIsCurrentFormValid,
    handleNextStep,
    handlePreviousStep,
    handleFinishAssisted,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const shouldDisableNext = currentStep !== 1 && !isCurrentFormValid;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AppMenu
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <Stack direction="column" gap={isTablet ? spacing.s300 : spacing.s500}>
          <Assisted
            step={steps[currentStep - 1]}
            totalSteps={steps.length}
            onNextClick={handleNextStep}
            onBackClick={handlePreviousStep}
            onSubmitClick={handleFinishAssisted}
            disableNext={shouldDisableNext}
            size={isTablet ? "small" : "large"}
            controls={{
              goBackText: "Anterior",
              goNextText: "Siguiente",
              submitText: "Enviar",
            }}
          />
          <Stack direction="column">
            {currentStep !== 3 && (
              <Stack
                direction="column"
                alignItems="flex-end"
                margin={spacing.s075}
              >
                <Button
                  appearance="gray"
                  variant="outlined"
                  spacing="compact"
                  iconBefore={<MdCheckCircleOutline />}
                  onClick={handleOpenModal}
                >
                  Requisitos
                </Button>
              </Stack>
            )}
            {currentStep === 1 && (
              <AlertCardStep handleNextStep={handleNextStep} />
            )}
            {currentStep === 2 && (
              <GeneralInformationForm
                ref={generalInformationRef}
                initialValues={initialGeneralInformationValues}
                withNextButton={true}
                handlePreviousStep={handlePreviousStep}
                onFormValid={setIsCurrentFormValid}
                handleNextStep={handleNextStep}
              />
            )}
            {currentStep === 3 && (
              <VerificationForm
                updatedData={{
                  personalInformation: {
                    isValid: isCurrentFormValid,
                    values: initialGeneralInformationValues,
                  },
                }}
                handleStepChange={(stepId) => setCurrentStep(stepId)}
                handlePreviousStep={handlePreviousStep}
                handleSubmit={handleFinishAssisted}
              />
            )}
          </Stack>
        </Stack>
      </AppMenu>
      {isModalOpen && (
        <RequirementsModal
          alertCards={mockAlertCards}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export { RequestPaymentUI };
