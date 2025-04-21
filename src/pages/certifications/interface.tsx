import { Button, Stack, useMediaQuery } from "@inubekit/inubekit";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext/useAppContext";
import { VinculationBanner } from "@components/layout/Banner";

import { StyledCertificationsContainer } from "./styles";
import { CertificationsTable } from "./components/CertificationsTable";

import { ICertificationsTable } from "./components/CertificationsTable/types";

interface CertificationsOptionsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  tableData: ICertificationsTable[];
  isLoading: boolean;
  appDescription?: string;
}

function CertificationsOptionsUI(props: CertificationsOptionsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    appDescription,
    tableData,
    isLoading,
  } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { logoUrl, selectedEmployee } = useAppContext();

  useErrorFlag(
    location.state?.showFlag,
    location.state?.flagMessage,
    location.state?.flagTitle,
    location.state?.isSuccess,
  );

  useEffect(() => {
    if (location.state?.showFlag) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      <Stack padding={spacing.s075} justifyContent="center">
        <VinculationBanner
          key={selectedEmployee ? selectedEmployee.employeeId : "no-employee"}
          name={
            selectedEmployee
              ? `${selectedEmployee.names} ${selectedEmployee.surnames}`
              : "Empleado no seleccionado"
          }
          status={
            selectedEmployee
              ? selectedEmployee.employeeStatus
              : "estado-desconocido"
          }
          imageUrl={logoUrl}
          redirectUrl="/employees/select-employee"
        />
      </Stack>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <StyledCertificationsContainer $isMobile={isMobile}>
          <Stack
            gap={spacing.s150}
            justifyContent="end"
            width="100%"
            direction={isMobile ? "column" : "row"}
          >
            <Button
              spacing="wide"
              variant="filled"
              iconBefore={<MdOutlineAdd />}
              type="link"
              path="/certifications/new-certification"
              fullwidth={isMobile}
            >
              Nueva certificación
            </Button>
          </Stack>
          <CertificationsTable data={tableData} loading={isLoading} />
        </StyledCertificationsContainer>
      </AppMenu>
    </>
  );
}

export { CertificationsOptionsUI };
