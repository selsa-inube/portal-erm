import { useEffect, useMemo } from "react";
import { useAppContext } from "@context/AppContext";

interface IData {
  diasPendientes: number;
}

export function usePendingDays(data: IData[]): number {
  const { pendingDays, setPendingDays } = useAppContext();

  const totalPendingDays = useMemo(() => {
    return data.reduce((total, item) => total + item.diasPendientes, 0);
  }, [data]);

  useEffect(() => {
    if (pendingDays !== totalPendingDays) {
      setPendingDays(totalPendingDays);
    }
  }, [totalPendingDays, pendingDays, setPendingDays]);

  return pendingDays;
}
