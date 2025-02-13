import { useState, useEffect } from "react";

import { getHolidaysRequestInProcess } from "@services/holidays/getHolidaysRequestInProcess";
import { useAppContext } from "@context/AppContext";
import { getDateString } from "@utils/date";
import { parseFormattedDate } from "@utils/date";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { holidaysNavConfig } from "./config/nav.config";
import { HolidaysOptionsUI } from "./interface";
import { IHolidaysTable } from "./components/HolidaysTable/types";
import { formatHolidaysData } from "./config/table.config";

function HolidaysOptions() {
  const [tableData, setTableData] = useState<IHolidaysTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flagShown, setFlagShown] = useState(false);
  const { user } = useAppContext();

  useErrorFlag(flagShown, "Error en la consulta las solicitudes en tramite");

  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);
      try {
        if (!user?.id) return;

        const holidays = await getHolidaysRequestInProcess(user.id);
        const formattedData = formatHolidaysData(holidays || []);

        const sortedData = formattedData.sort((a, b) => {
          const dateAString = getDateString(a.date);
          const dateBString = getDateString(b.date);
          const dateA = parseFormattedDate(dateAString);
          const dateB = parseFormattedDate(dateBString);
          return dateA.getTime() - dateB.getTime();
        });

        setTableData(sortedData);
      } catch (error) {
        console.error("Error al obtener las vacaciones:", error);
        setFlagShown(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchHolidays();
    }
  }, [user?.id]);

  return (
    <HolidaysOptionsUI
      appName={holidaysNavConfig[0].label}
      appRoute={holidaysNavConfig[0].crumbs}
      navigatePage={holidaysNavConfig[0].url}
      tableData={tableData}
      isLoading={isLoading}
    />
  );
}

export { HolidaysOptions };
