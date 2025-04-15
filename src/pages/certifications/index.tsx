import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlinePayments } from "react-icons/md";
import { Icon, useMediaQuery } from "@inubekit/inubekit";

import { useErrorFlag } from "@hooks/useErrorFlag";
import { useAppContext } from "@context/AppContext/useAppContext";
import {
  RequestStatus,
  RequestStatusLabel,
  HumanResourceRequestType,
} from "@services/certifications/postHumanResourceRequest/types";
import { deleteHumanResourceRequest } from "@services/certifications/deleteHumanResourceRequest";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";

import { formatDate } from "@utils/date";
import { CertificationsOptionsUI } from "./interface";
import { certificationsNavConfig } from "./config/nav.config";
import { ICertificationsTable } from "./components/CertificationsTable/types";
import { formatHumanResourceData } from "./config/table.config";

function CertificationsOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [tableData, setTableData] = useState<ICertificationsTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { requestsCertifications, setRequestsCertifications } = useAppContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  useErrorFlag(
    location.state?.showFlag,
    location.state?.flagMessage,
    location.state?.flagTitle,
    location.state?.isSuccess,
  );

  useErrorFlag(
    showFlag,
    "La solicitud se canceló correctamente",
    "Solicitud cancelada",
    true,
  );

  useEffect(() => {
    const fetchHumanResourceRequests = async () => {
      setIsLoading(true);

      try {
        const requests = await getHumanResourceRequests("certification", "");
        const formattedData = formatHumanResourceData(requests || []);
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

  useEffect(() => {
    if (location.state?.showFlag) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleDeleteRequest = async (requestToDelete: string) => {
    setIsDeleting(true);
    try {
      await deleteHumanResourceRequest(requestToDelete);
      setRequestsCertifications((prevRequests) =>
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

  const certificationsTableData: ICertificationsTable[] =
    requestsCertifications.map((request) => {
      const requestData = JSON.parse(request.humanResourceRequestData ?? "{}");

      return {
        requestId: request.requestId,
        requestNumber: { value: request.employeeId },
        type: {
          value:
            HumanResourceRequestType[
              request.humanResourceRequestType as keyof typeof HumanResourceRequestType
            ],
        },
        date: { value: formatDate(request.humanResourceRequestDate) },
        status: {
          value:
            RequestStatusLabel[
              request.humanResourceRequestStatus as RequestStatus
            ],
        },
        dataDetails: {
          value: {
            employeeId: request.employeeId,
            issuer: request.humanResourceRequestType,
            date: request.humanResourceRequestDate,
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
      };
    });

  const combinedTableData = [...certificationsTableData, ...tableData];

  return (
    <CertificationsOptionsUI
      appName={certificationsNavConfig[0].label}
      appRoute={certificationsNavConfig[0].crumbs}
      navigatePage={certificationsNavConfig[0].url}
      tableData={combinedTableData}
      isLoading={isLoading}
      isMobile={isMobile}
      handleDeleteRequest={(requestId) => void handleDeleteRequest(requestId)}
    />
  );
}

export { CertificationsOptions };
