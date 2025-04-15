import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery, Icon } from "@inubekit/inubekit";
import { MdOutlinePayments } from "react-icons/md";

import { useErrorFlag } from "@hooks/useErrorFlag";
import { useAppContext } from "@context/AppContext/useAppContext";
import {
  RequestStatus,
  RequestStatusLabel,
} from "@services/humanResourcesRequest/postHumanResourceRequest/types";
import { deleteHumanResourceRequest } from "@services/humanResourcesRequest/deleteHumanResourceRequest";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";

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
    const fetchHumanResourceRequests = async () => {
      setIsLoading(true);

      try {
        const requests = await getHumanResourceRequests("vacations", "");
        const formattedData = formatHolidaysData(requests ?? []);
        setTableData(formattedData);
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

    fetchHumanResourceRequests();
  }, []);

  const { isDeleting, handleDelete } = useDeleteRequest(
    deleteHumanResourceRequest,
    (filterFn) =>
      setRequestsHolidays((prevRequests) => prevRequests.filter(filterFn)),
    "La solicitud se canceló correctamente",
    "Solicitud cancelada",
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

  const holidaysTableData: IHolidaysTable[] = requestsHolidays.map(
    (request) => {
      const requestData = JSON.parse(request.humanResourceRequestData ?? "{}");
      return {
        requestId: request.requestId,
        description: {
          value: request.humanResourceRequestDescription,
        },
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
        type: {
          value: request.humanResourceRequestType ?? "Ordinario",
        },
      };
    },
  );

  const combinedTableData = [...holidaysTableData, ...tableData];

  return (
    <HolidaysOptionsUI
      appName={holidaysNavConfig[0].label}
      appRoute={holidaysNavConfig[0].crumbs}
      navigatePage={holidaysNavConfig[0].url}
      tableData={combinedTableData.length > 0 ? combinedTableData : []}
      isLoading={isLoading}
      hasActiveContract={hasActiveContract}
      isMobile={isMobile}
      handleDeleteRequest={(requestId) => void handleDelete(requestId)}
    />
  );
}

export { HolidaysOptions };
