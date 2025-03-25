import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

const StyledAppPage = styled.div`
  display: flex;
  justify-content: center;
  padding: ${spacing.s1000};

  @media (max-width: 700px) {
    padding: ${spacing.s400};
  }
`;

const StyledQuickAccessContainer = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;

  @media (min-width: 769px) {
    padding: ${spacing.s250};
    gap: ${spacing.s250};
    border-radius: ${spacing.s100};
    border: 1px solid
      ${({ theme }) =>
        theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  }
`;

const StyledDropdownMenu = styled.div`
  position: absolute;
  cursor: pointer;
  top: 70px;
  left: 20px;
  width: 73%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding-top: ${spacing.s050};
  padding-bottom: ${spacing.s050};

  max-height: 300px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 90%;
    top: 50px;
    left: 0px;
  }
`;

const StyledDropdownItem = styled.div`
  padding: ${spacing.s100} ${spacing.s200};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    & > * {
      color: ${({ theme }) =>
        theme?.palette?.blue?.B400 || inube.palette.blue.B400};
    }
  }

  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StyledTextfieldContainer = styled.div`
  position: relative;
  width: 100%;
`;

export {
  StyledAppPage,
  StyledQuickAccessContainer,
  StyledDropdownMenu,
  StyledDropdownItem,
  StyledTextfieldContainer,
};
