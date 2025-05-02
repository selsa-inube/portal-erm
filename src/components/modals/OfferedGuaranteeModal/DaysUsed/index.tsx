import { Stack, Text } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";
import { PendingUsedDaysTable } from "../PendingUsedDaysTable/index";
import { paymentTableHeaders } from "../PendingUsedDaysTable/tableConfig";
import { dataDaysUsed } from "./config";
import { IDaysUsed } from "./types";
import { useDaysUsedLogic } from "./interface";

export function DaysUsed(props: IDaysUsed) {
  const { isMobile, paymentData, opronData } = props;

  const { totalPendingDays, paymentTableData, opronTableData } =
    useDaysUsedLogic(paymentData, opronData);

  const headers = paymentTableHeaders;

  return (
    <Stack
      direction="column"
      height={isMobile ? "auto" : "auto"}
      padding={`${spacing.s300} ${spacing.s100} ${spacing.s0} ${spacing.s0}`}
      gap="16px"
    >
      <Stack justifyContent="center" alignItems="center" gap={spacing.s100}>
        <Text type="body" size="medium" appearance="gray">
          {dataDaysUsed.title}
        </Text>
        <Text type="title" weight="bold" size="large" appearance="primary">
          {totalPendingDays}
        </Text>
      </Stack>

      <Stack>
        <Text type="title" size="small" appearance="gray" weight="bold">
          Sistemas En Línea S.A - Indefinido
        </Text>
      </Stack>
      <PendingUsedDaysTable
        data={paymentTableData}
        loading={false}
        variant="payment"
        headers={headers}
      />

      <Stack>
        <Text type="title" size="small" appearance="gray" weight="bold">
          OPRON - Término fijo
        </Text>
      </Stack>
      <PendingUsedDaysTable
        data={opronTableData}
        loading={false}
        variant="payment"
        headers={headers}
      />
    </Stack>
  );
}
