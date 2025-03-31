import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme?: typeof inube;
}

const StyledModal = styled.div<IStyledModal>`
  overflow: visible;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  height: ${({ $smallScreen }) => ($smallScreen ? "264px" : "280px")};
  width: ${({ $smallScreen }) => ($smallScreen ? "311px" : "402px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s150 : `${spacing.s200} ${spacing.s300}`};
  gap: ${spacing.s150};
  border-radius: ${spacing.s100};
`;

const StyledContainerFilters = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: ${spacing.s050};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N20 || inube.palette.neutral.N20};
  border-radius: ${spacing.s075};
  height: 20px;
  padding: ${spacing.s100};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export { StyledModal, StyledContainerFilters, StyledContainerClose };
