import { useRef, useState } from "react";
import { FormikProps } from "formik";

import { NewEmployeeUI } from "./interface";
import { newEmployeeSteps } from "./config/assisted.config";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";

function NewEmployee() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formValues, setFormValues] = useState<IPersonalDataEntry>({
    id: "",
    identificationNumber: 0,
    lastNames: "",
    names: "",
    attachedFile: undefined,
  });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const personalDataRef = useRef<FormikProps<IPersonalDataEntry>>(null);

  const updateFormValues = () => {
    if (personalDataRef.current) {
      setFormValues(personalDataRef.current.values);
      setIsCurrentFormValid(personalDataRef.current.isValid);
    }
  };

  const handleNextStep = () => {
    updateFormValues();
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishAssisted = () => {
    alert("Asistido finalizado");
  };

  return (
    <NewEmployeeUI
      steps={newEmployeeSteps}
      currentStep={currentStep}
      isCurrentFormValid={isCurrentFormValid}
      personalDataRef={personalDataRef}
      initialPersonalDataValues={formValues}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { NewEmployee };
