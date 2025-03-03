import { Outlet } from "react-router-dom";
import { Nav, Stack, Grid, Header, useMediaQuery } from "@inubekit/inubekit";

import { nav, userMenu, actions } from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { VinculacionBanner } from "@components/layout/Banner";
import { spacing } from "@design/tokens/spacing";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
} from "./styles";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage() {
  const { logoUrl, selectedClient } = useAppContext();
  const isTablet = useMediaQuery("(max-width: 944px)");

  const handleVinculate = () => {
    console.log("Vinculación agregada");
  };

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
          <Stack padding={spacing.s075}>
            <VinculacionBanner
              name="José Manuel Hernández Díaz"
              status="activo"
              imageUrl={logoUrl}
              onVinculate={handleVinculate}
            />
          </Stack>
          <Grid
            templateColumns={!isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height={"95vh"}
          >
            {!isTablet && (
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
