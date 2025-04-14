import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";

import { postHumanResourceRequest } from "@src/services/humanResourcesRequest/postHumanResourceRequest";
import { IRequestBody } from "@src/services/humanResourcesRequest/postHumanResourceRequest/types";
import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { useAppContext } from "@context/AppContext/useAppContext";
import { formatDate } from "@utils/date";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { RequestEnjoymentUI } from "./interface";
import { requestEnjoymentSteps } from "./config/assisted.config";
import { holidaysNavConfig } from "../config/nav.config";
import { ModalState } from "./types";

function useFormManagement() {
  const [formValues, setFormValues] = useState<IGeneralInformationEntry>({
    id: "",
    daysOff: "",
    startDate: "",
    observations: "",
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
  const [requestNum, setRequestNum] = useState("");
  const [staffName, setStaffName] = useState<string | null>(null);
  const { selectedEmployee, requestsHolidays, setRequestsHolidays } =
    useAppContext();
  const navigate = useNavigate();

  const [showErrorFlag, setShowErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitRequest = async () => {
    try {
      const humanResourceRequestData = JSON.stringify({
        daysOff: formValues.daysOff,
        startDate: formatDate(formValues.startDate),
        contract: formValues.contract,
      });

      const userCodeInCharge = "User 1";
      const userNameInCharge = "Johan Daniel Garcia Nova";

      const requestBody: IRequestBody = {
        employeeId: selectedEmployee.employeeId,
        humanResourceRequestData: humanResourceRequestData,
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription: formValues.observations || "",
        humanResourceRequestStatus: "in_progress",
        humanResourceRequestType: "vacations",
        userCodeInCharge,
        userNameInCharge,
      };

      if (userCodeInCharge && userNameInCharge) {
        setStaffName(userNameInCharge);
      } else {
        setStaffName(null);
      }

      const response = await postHumanResourceRequest(requestBody);

      if (response?.humanResourceRequestId) {
        setRequestNum(response.humanResourceRequestNumber);
        setRequestsHolidays([...requestsHolidays, requestBody]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error sending request:", error);
      setErrorMessage(
        "Error al enviar la solicitud de vacaciones. Intente nuevamente.",
      );
      setShowErrorFlag(true);
      return false;
    }
  };

  const navigateAfterSubmission = () => {
    navigate("/holidays", {
      state: {
        showFlag: true,
        flagTitle: "Solicitud enviada",
        flagMessage: "La solicitud de certificación fue enviada exitosamente.",
        isSuccess: true,
      },
    });
  };

  return {
    requestId: requestNum,
    staffName,
    submitRequest,
    navigateAfterSubmission,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  };
}

function RequestEnjoyment() {
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
    if (currentStep < holidaysNavConfig.length) {
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
  } = holidaysNavConfig[1];

  return (
    <>
      <RequestEnjoymentUI
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
        steps={requestEnjoymentSteps}
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
          descriptionText="¿Realmente deseas enviar la solicitud de vacaciones?"
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

export { RequestEnjoyment };
