import { useRef, useState } from "react";
import { FormikProps } from "formik";

import { NewEmployeeUI } from "./interface";
import { newEmployeeSteps } from "./config/assisted.config";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";
import { IContractualPositionData } from "./forms/ContractualPositionDataForm/types";

function NewEmployee() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [personalData, setPersonalData] = useState<IPersonalDataEntry>({
    id: "",
    identificationNumber: 0,
    lastNames: "",
    names: "",
    attachedFile: undefined,
  });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const personalDataRef = useRef<FormikProps<IPersonalDataEntry>>(null);

  const [contractualPositionData, setContractualPositionData] =
    useState<IContractualPositionData>({
      id: "",
      normativeFramework: "",
      contractType: "",
      startDate: "",
      endDate: "",
      company: "",
      workingShift: "",
      team: "",
      position: "",
      salaryProfile: "",
      jobMode: "",
    });

  const contractualPositionDataFormRef =
    useRef<FormikProps<IContractualPositionData>>(null);

  const updateFormValues = () => {
    if (currentStep === 1 && personalDataRef.current) {
      setPersonalData(personalDataRef.current.values);
      setIsCurrentFormValid(personalDataRef.current.isValid);
    } else if (currentStep === 2 && contractualPositionDataFormRef.current) {
      setContractualPositionData(contractualPositionDataFormRef.current.values);
      setIsCurrentFormValid(contractualPositionDataFormRef.current.isValid);
    }
  };

  const handleNextStep = () => {
    updateFormValues();
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      updateFormValues();
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinishAssisted = () => {
    updateFormValues();

    console.log("Personal Data:", personalData);
    console.log("Contractual Position Data:", contractualPositionData);

    alert("Asistido finalizado (ver consola para datos).");
  };

  return (
    <NewEmployeeUI
      steps={newEmployeeSteps}
      currentStep={currentStep}
      isCurrentFormValid={isCurrentFormValid}
      personalDataRef={personalDataRef}
      initialPersonalDataValues={personalData}
      contractualPositionDataFormRef={contractualPositionDataFormRef}
      initialContractualPositionValues={contractualPositionData}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleFinishAssisted={handleFinishAssisted}
      setIsCurrentFormValid={setIsCurrentFormValid}
    />
  );
}

export { NewEmployee };
