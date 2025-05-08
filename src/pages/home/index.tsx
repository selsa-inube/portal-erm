import { Outlet } from "react-router-dom";
import { MdOutlineBeachAccess } from "react-icons/md";
import { Text, Stack, Grid, Header, useMediaQuery } from "@inubekit/inubekit";

import { AppCard } from "@components/feedback/AppCard";
import { spacing } from "@design/tokens/spacing";
import { userMenu, useConfigHeader, baseNavLinks } from "@config/nav.config";
import { useAppContext } from "@context/AppContext";
import { VinculationBanner } from "@components/layout/Banner";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledQuickAccessContainer,
} from "./styles";

const renderLogo = (imgUrl: string, altText: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} alt={altText} />
    </StyledContentImg>
  );
};

function Home() {
  const { user, logoUrl, selectedClient, selectedEmployee } = useAppContext();
  const configHeader = useConfigHeader();
  const isTablet = useMediaQuery("(max-width: 944px)");

  return (
    <StyledAppPage>
      <Grid templateRows="auto auto" height="100vh" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            selectedClient?.logo ?? logoUrl,
            selectedClient?.name ?? "Sin unidad seleccionada",
          )}
          user={{
            username: user?.username ?? "Nombre de usuario",
            client: selectedClient?.name ?? "Sin unidad seleccionada",
            breakpoint: "800px",
          }}
          menu={userMenu}
        />
        <StyledContainer>
          <Stack padding={spacing.s075} justifyContent="center">
            <VinculationBanner
              key={
                selectedEmployee ? selectedEmployee.employeeId : "no-employee"
              }
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
              infoItems={[
                {
                  icon: <MdOutlineBeachAccess />,
                  value: 10,
                  label: "Días pendientes",
                },
              ]}
            />
          </Stack>
          <StyledMain $isTablet={isTablet}>
            <Grid
              templateColumns={isTablet ? "1fr" : "auto 1fr"}
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
                  {baseNavLinks.map((link, index) => (
                    <AppCard
                      key={index}
                      title={link.label}
                      description={"Descripción"}
                      icon={link.icon}
                      url={link.path}
                    />
                  ))}
                </StyledQuickAccessContainer>
              </Stack>
            </Grid>
            <Outlet />
          </StyledMain>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { Home };
