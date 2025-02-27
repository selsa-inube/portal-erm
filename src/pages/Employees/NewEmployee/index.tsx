import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NewEmployeeUI } from "./interface";
import { newEmployeeSteps } from "./config/assisted.config";

function NewEmployee() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    if (currentStep < newEmployeeSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishAssisted = () => {
    alert("Asistido finalizado");
    navigate("/");
  };

  return (
    <NewEmployeeUI
      steps={newEmployeeSteps}
      currentStep={currentStep}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
    />
  );
}

export { NewEmployee };
