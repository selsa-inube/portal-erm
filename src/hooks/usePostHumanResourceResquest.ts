import { useState } from "react";
import { formatDate } from "@utils/date";
import { useAppContext } from "@context/AppContext/useAppContext";
import { HumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { useRequestSubmissionAPI } from "./useRequestSubmissionAPI";
import { useRequestNavigation } from "./useRequestNavigation";

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

  const {
    submitRequestToAPI,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
    humanResourceRequestId,
  } = useRequestSubmissionAPI();

  const { navigateAfterSubmission } = useRequestNavigation();

  const submitRequestHandler = async () => {
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

      const requestBody = {
        employeeId: selectedEmployee.employeeId,
        humanResourceRequestData,
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription: formValues.observations || "",
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

      const { success, response } = await submitRequestToAPI(requestBody);

      if (success && response?.humanResourceRequestId) {
        setRequestNum(response.humanResourceRequestNumber);

        const newRequest = {
          ...requestBody,
          id: response.humanResourceRequestId,
          number: response.humanResourceRequestNumber,
          humanResourceRequestNumber: response.humanResourceRequestNumber,
        };

        if (typeRequest === "vacations") {
          setRequestsHolidays([...requestsHolidays, newRequest]);
        } else if (typeRequest === "certifications") {
          setRequestsCertifications([...requestsCertifications, newRequest]);
        }

        if (humanResourceRequestId) {
          navigateAfterSubmission(typeRequest);
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error in request handler:", error);
      return false;
    }
  };

  return {
    requestId: requestNum,
    staffName,
    submitRequestHandler,
    navigateAfterSubmission,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  };
}
