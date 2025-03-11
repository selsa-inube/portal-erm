import { Stack, Button, Grid, useMediaQuery } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";
import { AlertCard, AlertCardProps } from "@components/data/AlertCard";

import { StyledContainer } from "./styles";

interface UnmetRequirementsFormUIProps {
  alertCards: AlertCardProps[];
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function UnmetRequirementsFormUI(props: UnmetRequirementsFormUIProps) {
  const { alertCards, withNextButton, handleNextStep, handlePreviousStep } =
    props;

  const isMobile = useMediaQuery("(max-width: 760px)");

  return (
    <form>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s250}>
            <Grid
              templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
              gap={spacing.s200}
              autoRows="unset"
            >
              {alertCards.map((item, index) => (
                <AlertCard
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  iconAppearance={item.iconAppearance}
                  requirement={item.requirement}
                  cause={item.cause}
                />
              ))}
            </Grid>
          </Stack>
        </StyledContainer>

        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s250}>
            <Button
              onClick={handlePreviousStep}
              appearance="gray"
              variant="outlined"
            >
              Anterior
            </Button>
            <Button onClick={handleNextStep}>Siguiente</Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { UnmetRequirementsFormUI };
