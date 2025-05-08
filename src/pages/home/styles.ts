import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface StyledMainProps {
  $isTablet: boolean;
  theme?: typeof inube;
}

const StyledAppPage = styled.div`
  display: inherit;
  box-sizing: border-box;
`;

const StyledContainer = styled.div`
  display: inherit;
  overflow: hidden;
`;

const StyledMain = styled.main<StyledMainProps>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${({ $isTablet }) =>
    $isTablet
      ? `${spacing.s400} ${spacing.s250} ${spacing.s0}`
      : `${spacing.s400} ${spacing.s800} ${spacing.s0}`};
`;

const StyledContentImg = styled(Link)`
  text-decoration: none;
  color: inheri;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${spacing.s100};
`;

const StyledLogo = styled.img`
  max-width: 100px;
`;

const StyledQuickAccessContainer = styled.div<StyledMainProps>`
  padding: ${spacing.s200};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  display: flex;
  flex-direction: row;
  gap: ${spacing.s250};
  flex-wrap: wrap;
  border-radius: ${spacing.s100};
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledQuickAccessContainer,
};
