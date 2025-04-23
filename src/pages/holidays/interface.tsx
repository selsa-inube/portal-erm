import { MdOutlineAirplanemodeActive, MdOutlinePayments } from "react-icons/md";
import { Button, Stack } from "@inubekit/inubekit";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { StyledHolidaysContainer } from "./styles";
import { HolidaysTable } from "./components/HolidaysTable";
import { IHolidaysTable } from "./components/HolidaysTable/types";

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

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <StyledHolidaysContainer $isMobile={isMobile}>
          <Stack
            gap={spacing.s150}
            justifyContent="end"
            width="100%"
            direction={isMobile ? "column" : "row"}
          >
            <Button
              spacing="wide"
              variant="outlined"
              fullwidth={isMobile}
              onClick={() => {
                /* no-op */
              }}
            >
              Días por disfrutar
            </Button>
            <Button
              spacing="wide"
              variant="filled"
              type="link"
              path="/holidays/request-enjoyment"
              iconBefore={<MdOutlineAirplanemodeActive />}
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
              iconBefore={<MdOutlinePayments />}
              fullwidth={isMobile}
              disabled={!hasActiveContract}
            >
              Solicitar pago
            </Button>
          </Stack>
          <HolidaysTable
            data={tableData}
            loading={isLoading}
            handleDeleteRequest={handleDeleteRequest}
          />
        </StyledHolidaysContainer>
      </AppMenu>
    </>
  );
}

export { HolidaysOptionsUI };
