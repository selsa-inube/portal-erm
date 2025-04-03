import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledModal {
  $smallScreen: boolean;
  theme: typeof inube;
}

interface IStyledContainerContent {
  $smallScreen: boolean;
  theme: typeof inube;
}

export const StyledModal = styled.div<IStyledModal>`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: ${({ $smallScreen }) => ($smallScreen ? "558px" : "515px")};
  width: ${({ $smallScreen }) => ($smallScreen ? "302px" : "652px")};
  background-color: ${inube.palette.neutral.N0};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? spacing.s150 : spacing.s300};
  gap: ${spacing.s200};
  border-radius: ${spacing.s100};
`;

export const StyledContainerContent = styled.div<IStyledContainerContent>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: ${({ $smallScreen }) => ($smallScreen ? spacing.s200 : spacing.s100)};
  padding: 4px;
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  padding: ${spacing.s050};
  border-radius: 8px;
`;
