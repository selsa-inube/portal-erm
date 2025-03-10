import {
  useMediaQueries,
  Grid,
  Text,
  Icon,
  Stack,
  Button,
} from "@inubekit/inubekit";
import { MdAdd, MdOutlineManageAccounts } from "react-icons/md";

import bannerImage from "@assets/images/banner.png";
import { spacing } from "@design/tokens/spacing";

import { getStatusConfig } from "./config";

import {
  StyledRadioClient,
  StyledBannerImage,
  MobileIconWrapper,
} from "./styles";

export interface VinculacionBannerProps {
  name: string;
  status: string;
  imageUrl: string;
  onVinculate: () => void;
}

function VinculacionBanner(props: VinculacionBannerProps) {
  const { name, status, onVinculate } = props;

  const mediaQueries = ["(max-width: 532px)", "(max-width: 460px)"];
  const matches = useMediaQueries(mediaQueries);
  const isMobile = matches["(max-width: 460px)"];

  const { color, icon, label } = getStatusConfig(status);

  return (
    <StyledRadioClient>
      <Grid
        templateColumns={isMobile ? "1fr" : "auto 1fr auto"}
        height={matches["(max-width: 532px)"] ? "auto" : "14px"}
        alignItems="center"
        alignContent="center"
        gap={spacing.s150}
        width="100%"
      >
        <Stack gap={spacing.s150}>
          <StyledBannerImage src={bannerImage} alt={name} />
          <Stack direction="column">
            <Text size="medium">{name}</Text>
            <Stack gap={spacing.s075} alignItems="center">
              <Icon
                appearance={color}
                icon={icon}
                cursorHover={true}
                spacing="narrow"
                shape="rectangle"
                size="12px"
              />
              <Text size="small" appearance={color}>
                {label}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent={isMobile ? "flex-end" : "flex-start"}>
          <MobileIconWrapper>
            <Icon
              appearance="primary"
              icon={<MdOutlineManageAccounts />}
              cursorHover={true}
              spacing="narrow"
              variant="outlined"
              shape="rectangle"
              size="22px"
            />
          </MobileIconWrapper>
        </Stack>
        <Stack>
          <Button
            iconBefore={<MdAdd />}
            variant="outlined"
            spacing="compact"
            fullwidth={isMobile}
            onClick={onVinculate}
          >
            Agregar vinculación
          </Button>
        </Stack>
      </Grid>
    </StyledRadioClient>
  );
}

export { VinculacionBanner };
