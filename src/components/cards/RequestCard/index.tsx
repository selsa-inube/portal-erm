import { Stack, Text, Divider } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { StyledRequestCard, StyledTitle } from "./styles";

interface RequestCardProps {
  id: string;
  title: string;
  requestDate: string;
  hasResponsible?: boolean;
  responsible?: string;
}

function RequestCard(props: RequestCardProps) {
  const {
    id,
    title,
    requestDate,
    hasResponsible = false,
    responsible = "Sin responsable",
  } = props;

  return (
    <StyledRequestCard>
      <StyledTitle>
        <Text
          type="label"
          size="small"
          appearance="primary"
          textAlign="center"
          weight="bold"
          padding={spacing.s050}
        >
          {title}
        </Text>
      </StyledTitle>
      <Divider dashed />
      <Stack direction="column" gap={spacing.s050}>
        <Text type="title" weight="bold" size="small">
          ID.
        </Text>
        <Text size="medium" appearance="gray">
          {id}
        </Text>
      </Stack>
      <Stack direction="column" gap={spacing.s050}>
        <Text type="title" weight="bold" size="small">
          Fecha de solicitud
        </Text>
        <Text size="medium" appearance="gray">
          {requestDate}
        </Text>
      </Stack>
      <Stack direction="column" gap={spacing.s050}>
        <Text type="title" weight="bold" size="small">
          Responsable
        </Text>
        <Text size="medium" appearance="gray">
          {hasResponsible ? responsible : "Sin responsable"}
        </Text>
      </Stack>
    </StyledRequestCard>
  );
}

export { RequestCard };
export type { RequestCardProps };
