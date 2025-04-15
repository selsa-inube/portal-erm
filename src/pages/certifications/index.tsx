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

import { formatDate } from "@utils/date";
import { CertificationsOptionsUI } from "./interface";
import { certificationsNavConfig } from "./config/nav.config";
import { ICertificationsTable } from "./components/CertificationsTable/types";

function CertificationsOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { requestsCertifications, setRequestsCertifications } = useAppContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const isLoading = false;

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

  return (
    <CertificationsOptionsUI
      appName={certificationsNavConfig[0].label}
      appRoute={certificationsNavConfig[0].crumbs}
      navigatePage={certificationsNavConfig[0].url}
      tableData={
        certificationsTableData.length > 0 ? certificationsTableData : []
      }
      isLoading={isLoading}
      isMobile={isMobile}
      handleDeleteRequest={(requestId) => void handleDeleteRequest(requestId)}
    />
  );
}

export { CertificationsOptions };
