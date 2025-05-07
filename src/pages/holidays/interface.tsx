import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Button, Stack, Tabs, ITab, Text } from "@inubekit/inubekit";
import { useAppContext } from "@context/AppContext";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { StyledHolidaysContainer } from "./styles";
import { HolidaysTable } from "./components/HolidaysTable";
import { DaysUsedTable } from "./components/DaysUsedTable";
import { IHolidaysTable } from "./components/HolidaysTable/types";
import { daysUsedMock } from "./config/table.config";

interface HolidaysOptionsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  tableData: IHolidaysTable[];
  isLoading: boolean;
  isMobile: boolean;
  appDescription?: string;
  hasActiveContract?: boolean;
  handleDeleteRequest: (requestId: string, justification: string) => void;
}

function HolidaysOptionsUI(props: HolidaysOptionsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    tableData,
    isLoading,
    isMobile,
    appDescription,
    hasActiveContract = true,
    handleDeleteRequest,
  } = props;

  const [selectedTab, setSelectedTab] = useState("dias");
  const { selectedEmployee } = useAppContext();

  const tabs: ITab[] = [
    { id: "dias", label: "Días utilizados" },
    {
      id: "solicitudes",
      label: isMobile
        ? "Solicitudes en trámite"
        : "Solicitudes de vacaciones en trámite",
    },
  ];

  const renderDaysUsedContent = () => (
    <StyledHolidaysContainer $isMobile={isMobile}>
      <Stack alignItems="center" justifyContent="space-between">
        <Text type="title" size="medium">
          Consulta de días utilizados
        </Text>
        <Stack
          gap={spacing.s150}
          justifyContent="end"
          direction={isMobile ? "column" : "row"}
        >
          <Button
            spacing="wide"
            variant="filled"
            type="link"
            path="/holidays/request-enjoyment"
            iconBefore={<MdAdd />}
            fullwidth={isMobile}
            disabled={!hasActiveContract}
          >
            Solicitar disfrute
          </Button>
          <Button
            spacing="wide"
            variant="filled"
            type="link"
            path="/holidays/request-payment"
            iconBefore={<MdAdd />}
            fullwidth={isMobile}
            disabled={!hasActiveContract}
          >
            Solicitar pago
          </Button>
        </Stack>
      </Stack>
      {selectedEmployee.employmentContracts?.map((contract) => (
        <div key={contract.contractId}>
          <Text type="title" size="medium" padding="16px 0 8px 0">
            Contrato: {contract.businessName} - {contract.contractType}
          </Text>
          <DaysUsedTable data={daysUsedMock} />
        </div>
      ))}
    </StyledHolidaysContainer>
  );

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        {!tableData || tableData.length === 0 ? (
          renderDaysUsedContent()
        ) : (
          <>
            <Tabs
              tabs={tabs}
              selectedTab={selectedTab}
              onChange={(tabId) => setSelectedTab(tabId)}
              scroll={false}
            />
            {selectedTab === "solicitudes" ? (
              <StyledHolidaysContainer $isMobile={isMobile}>
                <Text type="title" size="medium">
                  Solicitudes en trámite
                </Text>
                <HolidaysTable
                  data={tableData}
                  loading={isLoading}
                  hasViewDetailsPrivilege
                  hasDeletePrivilege
                  handleDeleteRequest={handleDeleteRequest}
                />
              </StyledHolidaysContainer>
            ) : (
              renderDaysUsedContent()
            )}
          </>
        )}
      </AppMenu>
    </>
  );
}

export { HolidaysOptionsUI };
