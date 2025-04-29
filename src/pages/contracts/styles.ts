import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface StyledContractsContainerProps {
  $isMobile: boolean;
  theme?: typeof inube;
}

interface IStyledSeparatorLine {
  theme: typeof inube;
}

interface IStyledAddVinculation {
  theme: typeof inube;
}

const StyledContractsContainer = styled.div<StyledContractsContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s250};
  border-radius: ${spacing.s100};
  border: 1px solid
    ${({ theme }) =>
      theme && theme.palette?.neutral?.N30
        ? theme.palette.neutral.N30
        : inube.palette.neutral.N30};
  padding: ${({ $isMobile }) =>
    $isMobile ? `${spacing.s300} ${spacing.s150}` : spacing.s300};
`;

const StyledSeparatorLine = styled.hr<IStyledSeparatorLine>`
  width: 2px;
  margin: 0px;
  border: 0px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

const StyledAddVinculation = styled.div<IStyledAddVinculation>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 236px;
  height: 368px;
  margin-bottom: ${spacing.s150};
  border-radius: 8px;
  box-shadow: 0px 2px 6px 1px
    ${({ theme }) => theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  }
`;

const StyledAddVinculationMobile = styled.div`
  position: fixed;
  right: ${spacing.s400};
  bottom: ${spacing.s500};
`;

export {
  StyledContractsContainer,
  StyledSeparatorLine,
  StyledAddVinculation,
  StyledAddVinculationMobile,
};
