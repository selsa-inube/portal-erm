import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery, Icon } from "@inubekit/inubekit";
import { MdOutlinePayments } from "react-icons/md";

import {
  RequestStatus,
  RequestStatusLabel,
} from "@services/humanResourcesRequest/postHumanResourceRequest/types";
import { useAppContext } from "@context/AppContext/useAppContext";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { formatHolidaysData } from "./config/table.config";
import { HolidaysOptionsUI } from "./interface";
import { holidaysNavConfig } from "./config/nav.config";
import { IHolidaysTable } from "./components/HolidaysTable/types";

function HolidaysOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [tableData, setTableData] = useState<IHolidaysTable[]>([]);
  const { requestsHolidays, setRequestsHolidays } = useAppContext();
  const hasActiveContract = true;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const requests = await getHumanResourceRequests("vacations", "");
        setTableData(formatHolidaysData(requests ?? []));
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes de recursos humanos:",
          error,
        );
        setTableData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const { isDeleting, handleDelete } = useDeleteRequest((filterFn) => {
    setRequestsHolidays((prev) => prev.filter(filterFn));
    setTableData((prev) => prev.filter(filterFn));
  });

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

  const mapHolidaysData = (): IHolidaysTable[] =>
    requestsHolidays.map((request) => {
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
          type: "icon" as const,
          value: (
            <Icon
              appearance="dark"
              size="16px"
              cursorHover
              icon={<MdOutlinePayments />}
            />
          ),
        },
        delete: {
          type: "icon" as const,
          disabled: isDeleting,
          value: (
            <Icon
              appearance="danger"
              size="16px"
              cursorHover
              icon={<MdOutlinePayments />}
            />
          ),
        },
        type: { value: request.humanResourceRequestType ?? "Ordinario" },
      };
    });

  const combinedTableData = [...mapHolidaysData(), ...tableData];

  return (
    <HolidaysOptionsUI
      appName={holidaysNavConfig[0].label}
      appRoute={holidaysNavConfig[0].crumbs}
      navigatePage={holidaysNavConfig[0].url}
      tableData={combinedTableData.length > 0 ? combinedTableData : []}
      isLoading={isLoading}
      hasActiveContract={hasActiveContract}
      isMobile={isMobile}
      handleDeleteRequest={(requestId, justification) => {
        const request = combinedTableData.find(
          (item) => item.requestId === requestId,
        );
        const description = request?.description?.value ?? "";
        void handleDelete(requestId, justification, description);
      }}
    />
  );
}

export { HolidaysOptions };
