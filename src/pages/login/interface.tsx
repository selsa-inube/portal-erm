import { Outlet } from "react-router-dom";
import { useMediaQueries, Grid, Stack, Text } from "@inubekit/inubekit";

import selsaLogo from "@assets/images/logoInube.png";
import { spacing } from "@src/design/tokens/spacing";

import {
  StyledWelcomeContainer,
  StyledOutletContainer,
  StyledLogo,
} from "./styles";

function LoginUI() {
  const { "(max-width: 768px)": screenMobile }: Record<string, boolean> =
    useMediaQueries(["(max-width: 768px)"]);

  return (
    <Grid
      templateColumns={screenMobile ? "1fr" : "repeat(2, 1fr)"}
      templateRows={screenMobile ? "minmax(300px, 20vh) 1fr" : "100vh"}
    >
      <StyledWelcomeContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          gap={screenMobile ? spacing.s200 : spacing.s400}
        >
          <Stack direction="column" alignItems="center" gap={spacing.s200}>
            <Stack direction="column" alignItems="center">
              <Text type="headline" size="small" weight="bold">
                ¡Bienvenido!
              </Text>
              <Text as="h1" type="headline">
                Portal-ERM
              </Text>
            </Stack>
            <StyledLogo
              src={selsaLogo}
              screenMobile={screenMobile}
              alt="Logo Inube"
            />
          </Stack>
        </Stack>
      </StyledWelcomeContainer>
      <StyledOutletContainer>
        <Stack
          alignItems="center"
          justifyContent="center"
          height={screenMobile ? "90vh" : "-webkit-fill-available"}
          padding={`${spacing.s600} ${spacing.s200}`}
        >
          <Outlet />
        </Stack>
      </StyledOutletContainer>
    </Grid>
  );
}

export { LoginUI };
