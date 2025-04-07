import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface ThemeType {
  palette: {
    neutral: {
      N900: string;
      N30: string;
    };
  };
}

interface IStyledContainer {
  $isMobile: boolean;
  theme: ThemeType;
}

const StyledBoardContainer = styled.div<IStyledContainer>`
  flex-direction: ${({ $isMobile }) => ($isMobile ? "row" : "column")};
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))"};
  width: 100%;
  border-top: 1px solid
    ${({ theme }) =>
      theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};
`;

const StyledRequestsContainer = styled.div<IStyledContainer>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ $isMobile, theme }) =>
    !$isMobile &&
    `padding: ${spacing.s250};
     gap: ${spacing.s250};
     border-radius: ${spacing.s100};
     border: 1px solid ${theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};`}
`;

const SearchContainer = styled.div<IStyledContainer>`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ $isMobile }) =>
    $isMobile ? spacing.s150 : spacing.s200};
`;

const StyledMenuContainer = styled.div<IStyledContainer>`
  position: absolute;
  background: white;
  border-radius: ${spacing.s100};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: ${spacing.s100};
  z-index: 1000;
  width: ${({ $isMobile }) => ($isMobile ? "162px" : "120px")};

  @media (max-width: 800px) {
    top: 211px;
    right: 65px;
  }

  @media (max-width: 490px) {
    top: 191px;
    right: 15px;
  }
`;
const StyledMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 11px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const StyledMenuIconContainer = styled.div<IStyledContainer>`
  position: relative;
  top: -50px;
  right: 16px;
  z-index: 1;
  width: 0px;
`;

export {
  StyledRequestsContainer,
  StyledBoardContainer,
  SearchContainer,
  StyledMenuContainer,
  StyledMenuButton,
  StyledMenuIconContainer,
};
