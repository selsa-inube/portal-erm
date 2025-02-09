import { useState, useEffect } from "react";
import { getHumanResourceRequests } from "@services/certifications/getCertificationsRequestInProcess";
import { certificationsNavConfig } from "./config/nav.config";
import { CertificationsOptionsUI } from "./interface";
import { ICertificationsTable } from "./components/CertificationsTable/types";
import { formatHumanResourceData } from "./config/table.config";

function HumanResourceOptions() {
  const [tableData, setTableData] = useState<ICertificationsTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHumanResourceRequests = async () => {
      setIsLoading(true);

      try {
        const requests = await getHumanResourceRequests();

        const formattedData = formatHumanResourceData(requests || []);

        setTableData(formattedData);
      } catch (error) {
        console.error(
          "Error al obtener las solicitudes de recursos humanos:",
          error,
        );
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
      isLoading={isLoading}
    />
  );
}

export { HumanResourceOptions };
