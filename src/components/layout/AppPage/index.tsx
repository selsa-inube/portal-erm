import { Outlet } from "react-router-dom";
import { Nav, Stack, Grid, Header, useMediaQuery } from "@inubekit/inubekit";

import { nav, userMenu, actions } from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { VinculationBanner } from "@components/layout/Banner";
import { spacing } from "@design/tokens/spacing";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
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
  const { logoUrl, selectedClient } = useAppContext();
  const isTablet = useMediaQuery("(max-width: 944px)");

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          portalId="portal"
          navigation={{ items: nav }}
          logoURL={renderLogo(logoUrl)}
          user={{
            username: "Nombre de usuario",
            client: selectedClient
              ? selectedClient.name
              : "Sin unidad seleccionada",
          }}
          menu={userMenu}
        />
        <StyledContainer>
          {withBanner && (
            <Stack padding={`${spacing.s075} ${spacing.s200}`}>
              <VinculationBanner
                name="José Manuel Hernández Díaz"
                status="vinculado"
                imageUrl={logoUrl}
              />
            </Stack>
          )}
          <Grid
            templateColumns={withNav && !isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height="85vh"
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
