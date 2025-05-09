import { IPendingUsedDaysTable } from "../PendingUsedDaysTable/types";

export const usePendingData = (
  data: { contrato: string; diasPendientes: number }[],
) => {
  const totalPendingDays = data.reduce(
    (total, item) => total + item.diasPendientes,
    0,
  );

  const contractData: IPendingUsedDaysTable[] = data.map((item) => ({
    contract: { value: item.contrato },
    pendingDays: { value: item.diasPendientes },
  }));

  return { totalPendingDays, contractData };
};
