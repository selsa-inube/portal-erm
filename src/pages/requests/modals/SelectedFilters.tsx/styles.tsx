import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

const StyledContainerFilters = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-grow: 1;
  gap: ${spacing.s050};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N20 || inube.palette.neutral.N20};
  border-radius: ${spacing.s075};
  padding: ${spacing.s100};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

const StyledFilterChip = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s050};
  background-color: ${({ theme }) =>
    theme?.palette?.blue?.B400 || inube.palette.blue.B400};
  padding: ${spacing.s050} ${spacing.s075};
  border-radius: ${spacing.s100};
`;

export { StyledContainerFilters, StyledFilterChip };
