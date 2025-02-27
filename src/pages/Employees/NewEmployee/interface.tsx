import {
  Assisted,
  IAssistedStep,
  Stack,
  useMediaQuery,
  Text,
} from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface NewEmployeeUIProps {
  steps: IAssistedStep[];
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
}

function NewEmployeeUI(props: NewEmployeeUIProps) {
  const {
    steps,
    currentStep,
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
        disableNext={false}
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
        {currentStep === 1 && <div>Contenido Paso 1 (Vacío)</div>}
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
