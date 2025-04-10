import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";
import { MdOutlinePayments } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";

import { useErrorFlag } from "@hooks/useErrorFlag";
import { useAppContext } from "@context/AppContext/useAppContext";
import {
  RequestStatus,
  RequestStatusLabel,
} from "@services/holidays/postHumanResourceRequest/types";

import { HolidaysOptionsUI } from "./interface";
import { holidaysNavConfig } from "./config/nav.config";
import { IHolidaysTable } from "./components/HolidaysTable/types";

function HolidaysOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { requestsHolidays } = useAppContext();
  const isLoading = false;
  const hasActiveContract = true;

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

  const holidaysTableData: IHolidaysTable[] = requestsHolidays.map(
    (request) => {
      const requestData = JSON.parse(request.humanResourceRequestData ?? "{}");

      return {
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
    />
  );
}

export { HolidaysOptions };
