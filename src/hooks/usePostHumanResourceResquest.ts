import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatDate } from "@utils/date";
import { HumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { IRequestBody } from "@src/services/humanResourcesRequest/postHumanResourceRequest/types";
import { postHumanResourceRequest } from "@src/services/humanResourcesRequest/postHumanResourceRequest";
import { useAppContext } from "@context/AppContext/useAppContext";

export function useRequestSubmission(
  formValues: HumanResourceRequestData,
  typeRequest: string,
) {
  const [requestNum, setRequestNum] = useState("");
  const [staffName, setStaffName] = useState<string | null>(null);
  const {
    selectedEmployee,
    requestsHolidays,
    setRequestsHolidays,
    requestsCertifications,
    setRequestsCertifications,
  } = useAppContext();
  const navigate = useNavigate();

  const [showErrorFlag, setShowErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitRequest = async () => {
    try {
      let humanResourceRequestData: string;

      if ("daysOff" in formValues) {
        humanResourceRequestData = JSON.stringify({
          daysOff: formValues.daysOff,
          startDate: formatDate(formValues.startDate),
          contract: formValues.contract,
        });
      } else {
        humanResourceRequestData = JSON.stringify({
          certification: formValues.certification,
          addressee: formValues.addressee,
          contract: formValues.contract,
          contractDesc: formValues.contractDesc,
        });
      }

      const userCodeInCharge = "User 1";
      const userNameInCharge = "Johan Daniel Garcia Nova";

      const requestBody: IRequestBody = {
        employeeId: selectedEmployee.employeeId,
        humanResourceRequestData: humanResourceRequestData,
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription: formValues.observations || "",
        humanResourceRequestStatus: "in_progress",
        humanResourceRequestType: "certification",
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

        if (typeRequest === "vacations") {
          setRequestsHolidays([...requestsHolidays, requestBody]);
        } else if (typeRequest === "certifications") {
          setRequestsCertifications([
            ...requestsCertifications,
            { ...requestBody, requestId: response.humanResourceRequestId },
          ]);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error sending request:", error);
      setErrorMessage(
        "Error al enviar la solicitud de vacaciones o certificación. Intente nuevamente.",
      );
      setShowErrorFlag(true);
      return false;
    }
  };

  const navigateAfterSubmission = () => {
    if (typeRequest === "vacations") {
      navigate("/holidays", {
        state: {
          showFlag: true,
          flagTitle: "Solicitud enviada",
          flagMessage: "La solicitud de vacaciones fue enviada exitosamente.",
          isSuccess: true,
        },
      });
    } else if (typeRequest === "certifications") {
      navigate("/certifications", {
        state: {
          showFlag: true,
          flagTitle: "Solicitud enviada",
          flagMessage:
            "La solicitud de certificación fue enviada exitosamente.",
          isSuccess: true,
        },
      });
    }
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
