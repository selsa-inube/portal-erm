import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledRequestCard {
  theme: typeof inube;
}

const StyledRequestCard = styled.div<IStyledRequestCard>`
  height: 183px;
  gap: ${spacing.s100};
  border-radius: 8px;
  padding: ${spacing.s150};
  box-shadow: 0px 2px 6px 1px
    ${({ theme }) => theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
  user-select: none;
`;

const StyledTitle = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.blue?.B50 || inube.palette.blue.B50};
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
`;

export { StyledRequestCard, StyledTitle };
