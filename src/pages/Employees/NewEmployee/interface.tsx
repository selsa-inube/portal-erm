import {
  Assisted,
  IAssistedStep,
  Stack,
  useMediaQuery,
  Text,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";

import { spacing } from "@design/tokens/spacing";

import { PersonalDataForm } from "./forms/PersonalDataForm";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";

interface NewEmployeeUIProps {
  steps: IAssistedStep[];
  currentStep: number;
  personalDataRef: React.RefObject<FormikProps<IPersonalDataEntry>>;
  isCurrentFormValid: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
}

function NewEmployeeUI(
  props: NewEmployeeUIProps & {
    initialPersonalDataValues: IPersonalDataEntry;
  },
) {
  const {
    steps,
    currentStep,
    personalDataRef,
    initialPersonalDataValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    handleNextStep,
    handlePreviousStep,
    handleFinishAssisted,
  } = props;
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
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

      <Stack direction="column" gap={spacing.s500}>
        {currentStep === 1 && (
          <PersonalDataForm
            ref={personalDataRef}
            initialValues={initialPersonalDataValues}
            withNextButton={true}
            onFormValid={setIsCurrentFormValid}
            handleNextStep={handleNextStep}
          />
        )}
        {currentStep === 2 && <div>Contenido Paso 2 (Vacío)</div>}
        {currentStep === 3 && <div>Contenido Paso 3 (Vacío)</div>}
        {currentStep === 4 && <div>Contenido Paso 4 (Vacío)</div>}
        {currentStep === 5 && <div>Contenido Paso 5 (Vacío)</div>}
        {currentStep === 6 && <div>Contenido Paso 6 (Vacío)</div>}
      </Stack>
    </Stack>
  );
}

export { NewEmployeeUI };
