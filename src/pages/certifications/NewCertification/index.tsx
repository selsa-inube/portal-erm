import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";

import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { postHumanResourceRequest } from "@services/certifications/postHumanResourceRequest";
import { IRequestBody } from "@services/certifications/postHumanResourceRequest/types";

import { NewCertificationUI } from "./interface";
import { newCCertificationApplication } from "./config/assisted.config";
import { certificationsNavConfig } from "../config/nav.config";
import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { ModalState } from "./types";

function useFormManagement() {
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>({
    id: "",
    certification: "",
    addressee: "",
    observations: "",
    contractDesc: "",
    contract: "",
  });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const updateFormValues = () => {
    if (generalInformationRef.current) {
      setFormValues(generalInformationRef.current.values);
      setIsCurrentFormValid(generalInformationRef.current.isValid);
    }
  };

  return {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    generalInformationRef,
    updateFormValues,
  };
}

function useModalManagement() {
  const [modalState, setModalState] = useState<ModalState>({
    isSendModalVisible: false,
    isRequestInfoModalVisible: false,
  });

  const openSendModal = () =>
    setModalState((prev) => ({ ...prev, isSendModalVisible: true }));
  const closeSendModal = () =>
    setModalState((prev) => ({ ...prev, isSendModalVisible: false }));
  const openInfoModal = () =>
    setModalState({
      isSendModalVisible: false,
      isRequestInfoModalVisible: true,
    });
  const closeInfoModal = () =>
    setModalState((prev) => ({ ...prev, isRequestInfoModalVisible: false }));

  return {
    modalState,
    openSendModal,
    closeSendModal,
    openInfoModal,
    closeInfoModal,
  };
}

function useRequestSubmission(formValues: IGeneralInformationEntry) {
  const [requestId, setRequestId] = useState("99887766");
  const [staffName, setStaffName] = useState<string | null>(null);
  const {
    selectedEmployee,
    requestsCertifications,
    setRequestsCertifications,
  } = useAppContext();
  const navigate = useNavigate();

  const [showErrorFlag, setShowErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitRequest = async () => {
    try {
      const userCodeInCharge = "User 1";
      const userNameInCharge = "Johan Daniel Garcia Nova";

      const requestBody: IRequestBody = {
        employeeId: selectedEmployee.employeeId,
        humanResourceRequestData: JSON.stringify({
          certification: formValues.certification,
          contract: formValues.contract,
        }),
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription: formValues.observations || "",
        humanResourceRequestStatus: "in_progress",
        humanResourceRequestType: "certification",
        userCodeInCharge,
        userNameInCharge,
      };

      setStaffName(userNameInCharge);

      const response = await postHumanResourceRequest(requestBody);

      if (response?.data?.requestId) {
        setRequestId(response.data.requestId);
        setRequestsCertifications([...requestsCertifications, requestBody]);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error sending request:", error);
      setErrorMessage(
        "Error al enviar la solicitud de certificación. Intenta nuevamente.",
      );
      setShowErrorFlag(true);
      return false;
    }
  };

  const navigateAfterSubmission = () => {
    navigate("/certifications", {
      state: {
        showFlag: true,
        flagTitle: "Solicitud enviada",
        flagMessage: "La solicitud de certificación fue enviada exitosamente.",
        isSuccess: true,
      },
    });
  };

  return {
    requestId,
    staffName,
    submitRequest,
    navigateAfterSubmission,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  };
}

function NewCertification() {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    generalInformationRef,
    updateFormValues,
  } = useFormManagement();

  const {
    modalState,
    openSendModal,
    closeSendModal,
    openInfoModal,
    closeInfoModal,
  } = useModalManagement();

  const {
    requestId,
    submitRequest,
    navigateAfterSubmission,
    staffName,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  } = useRequestSubmission(formValues);

  useErrorFlag(showErrorFlag, errorMessage, "Error", false, 10000);

  const handleNextStep = () => {
    if (currentStep < newCCertificationApplication.length) {
      updateFormValues();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishAssisted = () => {
    openSendModal();
  };

  const handleConfirmSendModal = async () => {
    setShowErrorFlag(false);
    const isSuccess = await submitRequest();
    if (isSuccess) {
      openInfoModal();
    } else {
      closeSendModal();
    }
  };

  const handleSubmitRequestInfoModal = () => {
    closeInfoModal();
    navigateAfterSubmission();
  };

  const {
    label: appName,
    crumbs: appRoute,
    url: navigatePage,
  } = certificationsNavConfig[1];

  return (
    <>
      <NewCertificationUI
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
        steps={newCCertificationApplication}
        currentStep={currentStep}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleFinishAssisted={handleFinishAssisted}
        setIsCurrentFormValid={setIsCurrentFormValid}
        setCurrentStep={setCurrentStep}
        isCurrentFormValid={isCurrentFormValid}
        generalInformationRef={generalInformationRef}
        initialGeneralInformationValues={formValues}
      />

      {modalState.isSendModalVisible && (
        <SendRequestModal
          descriptionText="¿Realmente deseas enviar la solicitud de certificación?"
          onSubmitButtonClick={handleConfirmSendModal}
          onCloseModal={closeSendModal}
          onSecondaryButtonClick={closeSendModal}
        />
      )}

      {modalState.isRequestInfoModalVisible && (
        <RequestInfoModal
          requestId={requestId}
          staffName={staffName ?? ""}
          onCloseModal={handleSubmitRequestInfoModal}
          onSubmitButtonClick={handleSubmitRequestInfoModal}
        />
      )}
    </>
  );
}

export { NewCertification };
