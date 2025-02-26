import { useState, useEffect } from "react";

import { getHumanResourceRequests } from "@src/services/humanResourcesRequest/getHumanResourcesRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { certificationsNavConfig } from "./config/nav.config";
import { CertificationsOptionsUI } from "./interface";
import { ICertificationsTable } from "./components/CertificationsTable/types";
import { formatHumanResourceData } from "./config/table.config";

function HumanResourceOptions() {
  const [tableData, setTableData] = useState<ICertificationsTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useErrorFlag(hasError);

  useEffect(() => {
    const fetchHumanResourceRequests = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const requests = await getHumanResourceRequests("certification", "");
        const formattedData = formatHumanResourceData(requests || []);
        setTableData(formattedData);
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes de recursos humanos:",
          error,
        );
        setHasError(true);
        setTableData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHumanResourceRequests();
  }, []);

  return (
    <CertificationsOptionsUI
      appName={certificationsNavConfig[0].label}
      appRoute={certificationsNavConfig[0].crumbs}
      navigatePage={certificationsNavConfig[0].url}
      tableData={tableData}
      isLoading={isLoading || hasError}
    />
  );
}

export { HumanResourceOptions };
