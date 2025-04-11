import { useEffect } from "react";
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
import { formatDate } from "@utils/date";

import { CertificationsOptionsUI } from "./interface";
import { certificationsNavConfig } from "./config/nav.config";
import { ICertificationsTable } from "./components/CertificationsTable/types";

function CertificationsOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { requestsCertifications } = useAppContext();
  const isLoading = false;

  const shouldShowFlag =
    location.state?.showFlag &&
    (location.state?.isSuccess || requestsCertifications.length > 0);

  useErrorFlag(
    shouldShowFlag,
    location.state?.flagMessage,
    location.state?.flagTitle,
    location.state?.isSuccess,
  );

  useEffect(() => {
    if (location.state?.showFlag) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const certificationsTableData: ICertificationsTable[] =
    requestsCertifications.map((request) => {
      const requestData = JSON.parse(request.humanResourceRequestData ?? "{}");

      return {
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
    />
  );
}

export { CertificationsOptions };
