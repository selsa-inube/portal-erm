import { useEffect } from "react";
import { Stack, Text } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext";

import { dataDaysPending } from "./config";
import { PendingUsedDaysTable } from "../PendingUsedDaysTable/index";
import { usePendingData } from "./interface";

import { IPendingUsedDaysTableHeader } from "../PendingUsedDaysTable/types";
import { contractTableHeaders } from "../PendingUsedDaysTable/tableConfig";

interface IDaysPending {
  isMobile: boolean;
  data: { contrato: string; diasPendientes: number }[];
}

export function DaysPending(props: IDaysPending) {
  const { isMobile, data } = props;
  const { setPendingDays } = useAppContext();

  const { totalPendingDays, contractData } = usePendingData(data);

  useEffect(() => {
    setPendingDays(totalPendingDays);
  }, [totalPendingDays, setPendingDays]);

  const headers: IPendingUsedDaysTableHeader[] = contractTableHeaders;

  return (
    <Stack
      direction="column"
      height={isMobile ? "auto" : "auto"}
      padding={`${spacing.s300} ${spacing.s0} ${spacing.s150} ${spacing.s0}`}
      gap="16px"
    >
      <Stack justifyContent="center" alignItems="center" gap={spacing.s100}>
        <Text type="body" size="medium" appearance="gray">
          {dataDaysPending.title}
        </Text>
        <Text type="title" weight="bold" size="large" appearance="primary">
          {totalPendingDays}
        </Text>
      </Stack>

      <PendingUsedDaysTable
        data={contractData}
        loading={false}
        variant="contract"
        headers={headers}
      />
    </Stack>
  );
}
