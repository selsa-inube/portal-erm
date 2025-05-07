import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

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

  const { handleDelete } = useDeleteRequest((filterFn) => {
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

  return (
    <HolidaysOptionsUI
      appName={holidaysNavConfig[0].label}
      appRoute={holidaysNavConfig[0].crumbs}
      navigatePage={holidaysNavConfig[0].url}
      tableData={[]}
      isLoading={isLoading}
      hasActiveContract={hasActiveContract}
      isMobile={isMobile}
      handleDeleteRequest={(requestId, justification) => {
        const request = tableData.find((item) => item.requestId === requestId);
        const requestNumber = request?.requestNumber ?? "";
        void handleDelete(requestId, justification, requestNumber);
      }}
    />
  );
}

export { HolidaysOptions };
