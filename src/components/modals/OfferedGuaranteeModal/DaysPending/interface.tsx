import { useState, useEffect } from "react";
import { IPendingUsedDaysTable } from "../PendingUsedDaysTable/types";
import { mockDataDaysPending } from "@mocks/mockDataDays/mockData";

export const usePendingData = () => {
  const [contractData, setContractData] = useState<IPendingUsedDaysTable[]>([]);
  const [totalPendingDays, setTotalPendingDays] = useState(0);

  useEffect(() => {
    const data = mockDataDaysPending;

    const transformed = data.map((item) => ({
      contract: { value: item.contrato },
      pendingDays: { value: item.diasPendientes },
    }));

    const total = data.reduce((acc, item) => acc + item.diasPendientes, 0);

    setContractData(transformed);
    setTotalPendingDays(total);
  }, []);

  return { contractData, totalPendingDays };
};
