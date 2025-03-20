import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledContainer {
  theme: typeof inube;
  $isMobile: boolean;
}

const StyledContractCard = styled.div<IStyledContainer>`
  width: ${({ $isMobile }) => ($isMobile ? "auto" : "fit-content")};
  height: 395px;
  border-radius: 8px;
  padding: ${spacing.s150};
  box-shadow: 0px 2px 6px
    ${({ theme }) => theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
  border: 1px solid
    ${({ theme }) => theme?.palette?.blue?.B400 || inube.palette.blue.B400};
  user-select: none;
`;

const StyledSeparatorLine = styled.hr`
  width: 2px;
  margin: 0px;
  border: 0px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

export { StyledContractCard, StyledSeparatorLine };
