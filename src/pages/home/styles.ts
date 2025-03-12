import styled from "styled-components";
import { Link } from "react-router-dom";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface Theme {
  palette: {
    neutral: {
      N10: string;
      N30: string;
    };
  };
}

interface StyledFooterProps {
  theme?: Theme;
}

interface StyledMainProps {
  $isTablet: boolean;
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

const StyledLogoFooter = styled.img`
  width: 32px;
  height: 32px;
`;

const StyledFooter = styled.footer<StyledFooterProps>`
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding: ${spacing.s200} ${spacing.s300};
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

const StylesAccess = styled.div<StyledMainProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${spacing.s100};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  gap: ${spacing.s100};
  flex-wrap: wrap;
  border-radius: ${spacing.s100};
  height: 750px;
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledLogoFooter,
  StyledMain,
  StyledFooter,
  StyledQuickAccessContainer,
  StylesAccess,
};
