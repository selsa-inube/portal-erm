import { useState } from "react";
import {
  Assisted,
  IAssistedStep,
  Stack,
  useMediaQuery,
  Text,
  Button,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdCheckCircleOutline } from "react-icons/md";

import { spacing } from "@design/tokens/spacing";
import { mockAlertCards } from "@mocks/requirements/requirements.mock";

import { PersonalDataForm } from "./forms/PersonalDataForm";
import { ContractualPositionDataForm } from "./forms/ContractualPositionDataForm";
import { RequirementsModal } from "./modals/RequirementsModal";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";
import { IContractualPositionData } from "./forms/ContractualPositionDataForm/types";

interface NewEmployeeUIProps {
  steps: IAssistedStep[];
  currentStep: number;
  isCurrentFormValid: boolean;
  personalDataRef: React.RefObject<FormikProps<IPersonalDataEntry>>;
  initialPersonalDataValues: IPersonalDataEntry;
  contractualPositionDataFormRef: React.RefObject<
    FormikProps<IContractualPositionData>
  >;
  initialContractualPositionValues: IContractualPositionData;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewEmployeeUI(props: NewEmployeeUIProps) {
  const {
    steps,
    currentStep,
    isCurrentFormValid,
    personalDataRef,
    initialPersonalDataValues,
    contractualPositionDataFormRef,
    initialContractualPositionValues,
    handleNextStep,
    handlePreviousStep,
    handleFinishAssisted,
    setIsCurrentFormValid,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Stack
        direction="column"
        gap={isTablet ? spacing.s300 : spacing.s500}
        margin={
          isTablet
            ? `${spacing.s300} ${spacing.s200}`
            : `${spacing.s400} ${spacing.s800}`
        }
      >
        <Text type="title" as="h1" size={isTablet ? "medium" : "large"}>
          Vinculación de un empleado nuevo
        </Text>
        <Assisted
          step={steps[currentStep - 1]}
          totalSteps={steps.length}
          disableNext={!isCurrentFormValid}
          size={isTablet ? "small" : "large"}
          controls={{
            goBackText: "Anterior",
            goNextText: "Siguiente",
            submitText: "Enviar",
          }}
          onNextClick={handleNextStep}
          onBackClick={handlePreviousStep}
          onSubmitClick={handleFinishAssisted}
        />

        <Stack direction="column">
          <Stack direction="column" alignItems="flex-end" margin={spacing.s075}>
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

          {currentStep === 1 && (
            <PersonalDataForm
              ref={personalDataRef}
              initialValues={initialPersonalDataValues}
              withNextButton={true}
              onFormValid={setIsCurrentFormValid}
              handleNextStep={handleNextStep}
            />
          )}

          {currentStep === 2 && (
            <ContractualPositionDataForm
              ref={contractualPositionDataFormRef}
              initialValues={initialContractualPositionValues}
              withNextButton={true}
              onFormValid={setIsCurrentFormValid}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
            />
          )}

          {currentStep === 3 && <div>Contenido Paso 3 (Vacío)</div>}
          {currentStep === 4 && <div>Contenido Paso 4 (Vacío)</div>}
          {currentStep === 5 && <div>Contenido Paso 5 (Vacío)</div>}
          {currentStep === 6 && <div>Contenido Paso 6 (Vacío)</div>}
        </Stack>
      </Stack>

      {isModalOpen && (
        <RequirementsModal
          alertCards={mockAlertCards}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export { NewEmployeeUI };
