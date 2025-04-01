import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

const StyledBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid
    ${({ theme }) =>
      theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme?.palette?.neutral?.N900 || inube.palette.neutral.N900};

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledRequestsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 769px) {
    padding: ${spacing.s250};
    gap: ${spacing.s250};
    border-radius: ${spacing.s100};
    border: 1px solid
      ${({ theme }) =>
        theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  }
`;

const StyledTextfieldContainer = styled.div`
  position: relative;
  width: 100%;
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const StyledMenuContainer = styled.div`
  position: absolute;
  top: -29px;
  right: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 8px;
  z-index: 1000;
  width: 162px;
`;

const StyledMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const StyledMenuIconContainer = styled.div`
  position: absolute;
  top: -55px;
  right: 0;
  z-index: 1100;
`;

export {
  StyledTextfieldContainer,
  StyledRequestsContainer,
  StyledBoardContainer,
  SearchContainer,
  StyledMenuContainer,
  StyledMenuButton,
  StyledMenuIconContainer,
};
