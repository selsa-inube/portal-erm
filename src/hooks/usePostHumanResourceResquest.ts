import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatDate } from "@utils/date";
import { IGeneralInformationEntry } from "@ptypes/humanResourcesRequest.types";
import { IRequestBody } from "@src/services/humanResourcesRequest/postHumanResourceRequest/types";
import { postHumanResourceRequest } from "@src/services/humanResourcesRequest/postHumanResourceRequest";
import { useAppContext } from "@context/AppContext/useAppContext";

export function useRequestSubmission(
  formValues: IGeneralInformationEntry,
  typeRequest: string,
) {
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
        humanResourceRequestDescription: formValues.observations ?? "",
        humanResourceRequestStatus: "in_progress",
        humanResourceRequestType: typeRequest,
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
