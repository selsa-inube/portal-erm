import { Outlet } from "react-router-dom";
import {
  MdOutlineArrowForward,
  MdOutlineKeyboardArrowRight,
  MdOutlineAdd,
} from "react-icons/md";
import {
  Text,
  Stack,
  Grid,
  Header,
  useMediaQuery,
  Button,
} from "@inubekit/inubekit";

import logoInube from "@assets/images/logoInube.png";
import { AppCard } from "@components/feedback/AppCard";
import { spacing } from "@design/tokens/spacing";
import { userMenu, nav } from "@config/nav.config";
import { useAppContext } from "@context/AppContext";
import { VinculacionBanner } from "@components/layout/Banner";

import { ILink } from "./types";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledLogoFooter,
  StyledMain,
  StyledFooter,
  StyledQuickAccessContainer,
  StylesAccess,
} from "./styles";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

const handleVinculate = () => {
  console.log("Vinculación agregada");
};

function Home() {
  const { user, logoUrl, selectedClient } = useAppContext();
  const businessUnitName = selectedClient?.name || "Sin unidad seleccionada";
  const isTablet = useMediaQuery("(max-width: 944px)");

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          portalId="portal"
          logoURL={renderLogo(logoUrl)}
          user={{
            username: user?.username ?? "Nombre de usuario",
            client: businessUnitName,
          }}
          menu={userMenu}
        />
        <StyledContainer>
          <Stack padding={spacing.s075}>
            <VinculacionBanner
              name="José Manuel Hernández Díaz"
              status="vinculado"
              imageUrl={logoUrl}
              onVinculate={handleVinculate}
            />
          </Stack>
          <StyledMain $isTablet={isTablet}>
            <Grid
              templateColumns={isTablet ? "1fr" : "4fr 1fr"}
              gap={spacing.s600}
              alignItems="start"
            >
              <Stack gap={spacing.s300} direction="column">
                <Text size={isTablet ? "medium" : "large"} type="headline">
                  Bienvenido(a), {user?.username ?? "Usuario"}
                </Text>
                <Text
                  type="title"
                  appearance="gray"
                  size={isTablet ? "medium" : "large"}
                >
                  Aquí tienes las funcionalidades disponibles.
                </Text>
                <StyledQuickAccessContainer $isTablet={isTablet}>
                  {Object.values(nav.sections?.administrate?.links)?.map(
                    (link: ILink, index: number) => (
                      <AppCard
                        key={index}
                        title={link.label}
                        description={link.description ?? "Descripción"}
                        icon={link.icon}
                        url={link.path}
                      />
                    ),
                  )}
                </StyledQuickAccessContainer>
              </Stack>
              {!isTablet && (
                <Stack direction="column">
                  <Text
                    type="title"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    Accesos rápidos
                  </Text>
                  <StylesAccess $isTablet={isTablet}>
                    <Stack gap={spacing.s200} direction="column">
                      <Button
                        variant="none"
                        appearance="dark"
                        type="link"
                        path="/holidays/request-enjoyment"
                        iconBefore={<MdOutlineArrowForward />}
                      >
                        Solicitar disfrute de Vacaciones
                      </Button>
                      <Button
                        variant="none"
                        appearance="dark"
                        type="link"
                        path="/holidays/request-payment"
                        iconBefore={<MdOutlineKeyboardArrowRight />}
                      >
                        Solicitar pago de Vacaciones
                      </Button>
                      <Button
                        variant="none"
                        appearance="dark"
                        type="link"
                        path="/certifications/new-certification"
                        iconBefore={<MdOutlineAdd />}
                      >
                        Solicitar certificación
                      </Button>
                    </Stack>
                    <StyledFooter>
                      <StyledContentImg to="/">
                        <StyledLogoFooter src={logoInube} alt="Logo Inube" />
                        <Text
                          appearance="gray"
                          textAlign="center"
                          size="medium"
                        >
                          inube - 2025
                        </Text>
                      </StyledContentImg>
                    </StyledFooter>
                  </StylesAccess>
                </Stack>
              )}
            </Grid>
            <Outlet />
          </StyledMain>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { Home };
