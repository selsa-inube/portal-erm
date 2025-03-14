import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

const StyledAppPage = styled.div`
  display: flex;
  justify-content: center;
  padding: ${spacing.s200};
`;

const StyledQuickAccessContainer = styled.div`
  padding: ${spacing.s250};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  gap: ${spacing.s250};
  border-radius: ${spacing.s100};
`;

const StyledDropdownMenu = styled.div`
  position: absolute;
  cursor: pointer;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledDropdownItem = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    & > * {
      color: ${({ theme }) =>
        theme?.palette?.blue?.B400 || inube.palette.blue.B400};
    }
  }

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export {
  StyledAppPage,
  StyledQuickAccessContainer,
  StyledDropdownMenu,
  StyledDropdownItem,
};
