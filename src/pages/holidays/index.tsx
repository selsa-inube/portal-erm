import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery, Icon } from "@inubekit/inubekit";
import { MdOutlinePayments } from "react-icons/md";

import { useErrorFlag } from "@hooks/useErrorFlag";
import { useAppContext } from "@context/AppContext/useAppContext";
import {
  RequestStatus,
  RequestStatusLabel,
} from "@services/holidays/postHumanResourceRequest/types";
import { deleteHumanResourceRequest } from "@services/holidays/deleteHumanResourceRequest";

import { HolidaysOptionsUI } from "./interface";
import { holidaysNavConfig } from "./config/nav.config";
import { IHolidaysTable } from "./components/HolidaysTable/types";

function HolidaysOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { requestsHolidays, setRequestsHolidays } = useAppContext();
  const [showFlag, setShowFlag] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isLoading = false;
  const hasActiveContract = true;

  useErrorFlag(
    showFlag,
    "La solicitud se canceló correctamente",
    "Solicitud cancelada",
    true,
  );

  useErrorFlag(
    location.state?.showFlag,
    location.state?.flagMessage,
    location.state?.flagTitle,
    location.state?.isSuccess,
  );

  useEffect(() => {
    if (location.state?.showFlag) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleDeleteRequest = async (requestToDelete: string) => {
    setIsDeleting(true);
    try {
      await deleteHumanResourceRequest(requestToDelete);
      setRequestsHolidays((prevRequests) =>
        prevRequests.filter((request) => request.requestId !== requestToDelete),
      );
      setShowFlag(false);
      setTimeout(() => setShowFlag(true), 0);
    } catch {
      navigate(location.pathname, {
        state: {
          showFlag: true,
          flagTitle: "Error",
          flagMessage: "No se pudo eliminar la solicitud",
          isSuccess: false,
        },
        replace: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const holidaysTableData: IHolidaysTable[] = requestsHolidays.map(
    (request) => {
      const requestData = JSON.parse(request.humanResourceRequestData ?? "{}");

      return {
        requestId: request.requestId,
        description: { value: request.humanResourceRequestDescription },
        date: { value: requestData.startDate },
        days: { value: Number(requestData.daysOff) },
        status: {
          value:
            RequestStatusLabel[
              request.humanResourceRequestStatus as RequestStatus
            ],
        },
        dataDetails: {
          value: {
            daysEnjoyed: requestData.daysOff,
            startDate: requestData.startDate,
            contract: requestData.contract,
            description: request.humanResourceRequestDescription,
          },
        },
        details: {
          type: "icon",
          value: (
            <Icon
              appearance="dark"
              size="16px"
              cursorHover={true}
              icon={<MdOutlinePayments />}
            />
          ),
        },
        delete: {
          type: "icon",
          disabled: isDeleting,
          value: (
            <Icon
              appearance="danger"
              size="16px"
              cursorHover={true}
              icon={<MdOutlinePayments />}
            />
          ),
        },
        type: { value: request.humanResourceRequestType ?? "Ordinario" },
      };
    },
  );

  return (
    <HolidaysOptionsUI
      appName={holidaysNavConfig[0].label}
      appRoute={holidaysNavConfig[0].crumbs}
      navigatePage={holidaysNavConfig[0].url}
      tableData={holidaysTableData.length > 0 ? holidaysTableData : []}
      isLoading={isLoading}
      hasActiveContract={hasActiveContract}
      isMobile={isMobile}
      handleDeleteRequest={(requestId) => void handleDeleteRequest(requestId)}
    />
  );
}

export { HolidaysOptions };
