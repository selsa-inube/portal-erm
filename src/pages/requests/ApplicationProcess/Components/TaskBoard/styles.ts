import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface StyledTaskContentProps {
  $isRightSection: boolean;
  theme?: typeof inube;
}

const StyledTaskBoardContainer = styled.div`
  display: flex;
  min-height: 100px;
  border-radius: ${spacing.s100};
  border: 2px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

const StyledTaskSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledTaskHeader = styled.h3`
  margin: 0;
  padding: ${spacing.s150};
  border-bottom: 2px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

const StyledTaskContent = styled.div<StyledTaskContentProps>`
  max-width: 500px;
  position: relative;
  ${({ $isRightSection, theme }) =>
    $isRightSection
      ? `&::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 2px;
          background-color: ${
            theme?.palette?.neutral?.N30 ?? inube.palette.neutral.N30
          };
        }`
      : ``}
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: ${spacing.s200};
  gap: ${spacing.s200};
  height: 100%;
`;

const StyledMobileBoard = styled.div`
  min-height: 100px;
  border-radius: ${spacing.s100};
  border: 2px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

export {
  StyledTaskBoardContainer,
  StyledTaskSection,
  StyledTaskHeader,
  StyledTaskContent,
  StyledMobileBoard,
};
