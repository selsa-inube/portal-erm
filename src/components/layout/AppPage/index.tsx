import { Outlet } from "react-router-dom";
import { Nav, Grid, Header, useMediaQuery } from "@inubekit/inubekit";

import { nav, userMenu, actions } from "@config/nav.config";
import { useAppContext } from "@src/context/AppContext/useAppContext";
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
  const { logoUrl } = useAppContext();
  const isTablet = useMediaQuery("(max-width: 944px)");

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          portalId="portal"
          navigation={{
            items: nav,
          }}
          logoURL={renderLogo(logoUrl)}
          user={{
            username: "Nombre de usuario",
          }}
          menu={userMenu}
        />
        <StyledContainer>
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
