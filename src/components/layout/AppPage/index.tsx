import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // <-- Importa useNavigate
import {
  Nav,
  Stack,
  Grid,
  Header,
  useMediaQuery,
  Icon,
} from "@inubekit/inubekit";
import { MdOutlineChevronRight } from "react-icons/md";

import { nav, userMenu, actions } from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { VinculacionBanner } from "@components/layout/Banner";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";
import { spacing } from "@design/tokens/spacing";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledCollapseIcon,
  StyledCollapse,
} from "./styles";

interface AppPageProps {
  withNav?: boolean;
  withBanner?: boolean;
}

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage(props: AppPageProps) {
  const { withNav = true, withBanner = true } = props;
  const { logoUrl, selectedClient, businessUnits, setSelectedClient } =
    useAppContext();
  const isTablet = useMediaQuery("(max-width: 944px)");
  const navigate = useNavigate();

  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      collapseMenuRef.current &&
      !collapseMenuRef.current.contains(event.target as Node) &&
      businessUnitChangeRef.current &&
      !businessUnitChangeRef.current.contains(event.target as Node)
    ) {
      setCollapse(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoClick = (businessUnit: IBusinessUnit) => {
    setSelectedClient({
      id: businessUnit.businessUnitPublicCode,
      name: businessUnit.abbreviatedName,
      sigla: businessUnit.descriptionUse,
      logo: businessUnit.urlLogo,
    });

    setCollapse(false);
    navigate("/employees/select-employee");
  };

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          portalId="portal"
          navigation={{ items: nav }}
          logoURL={renderLogo(selectedClient?.logo || logoUrl)}
          user={{
            username: "Nombre de usuario",
            client: selectedClient
              ? selectedClient.name
              : "Sin unidad seleccionada",
          }}
          menu={userMenu}
        />

        <StyledCollapseIcon
          $collapse={collapse}
          ref={collapseMenuRef}
          $isTablet={isTablet}
          onClick={() => setCollapse(!collapse)}
        >
          <Icon
            icon={<MdOutlineChevronRight />}
            appearance="primary"
            size="24px"
            cursorHover
          />
        </StyledCollapseIcon>
        {collapse && (
          <StyledCollapse ref={businessUnitChangeRef}>
            <BusinessUnitChange
              businessUnits={businessUnits}
              selectedClient={selectedClient?.name || ""}
              onLogoClick={handleLogoClick}
            />
          </StyledCollapse>
        )}
        <StyledContainer>
          {withBanner && (
            <Stack padding={spacing.s075}>
              <VinculacionBanner
                name="José Manuel Hernández Díaz"
                status="vinculado"
                imageUrl={logoUrl}
                onVinculate={() => console.log("Vinculación agregada")}
              />
            </Stack>
          )}
          <Grid
            templateColumns={withNav && !isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height="95vh"
          >
            {withNav && !isTablet && (
              <Nav navigation={nav} actions={actions} collapse={true} />
            )}
            <StyledMain>
              <Outlet />
            </StyledMain>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
