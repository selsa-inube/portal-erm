import styled from "styled-components";
import { inube } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

interface StyledInfoItemProps {
  clickable?: boolean;
}

const StyledRadioClient = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  padding: ${spacing.s200} ${spacing.s075};
  box-sizing: border-box;
  width: 100%;
  max-width: 1064px;
  box-shadow: 0px 1px 3px 1px
    ${({ theme }) =>
      theme?.palette?.neutralAlpha?.N40A || inube.palette.neutralAlpha.N40A};
  border-radius: ${spacing.s050};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

const StyledBannerImage = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  border: 0.5px solid
    ${({ theme }) => theme?.palette?.blue?.B400 || inube.palette?.blue?.B400};
  border-radius: 2px;
  min-width: 34px;
  min-height: 34px;
`;

const VerticalDivider = styled.div`
  width: 2px;
  height: auto;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  border-radius: 2px;
`;

const MobileToggle = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileDropdown = styled.div`
  position: absolute;
  top: calc(100% + ${spacing.s100});
  right: 0;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  border-radius: ${spacing.s050};
  box-shadow: 0px 4px 8px
    ${({ theme }) =>
      theme?.palette?.neutralAlpha?.N40A || inube.palette.neutralAlpha.N40A};
  min-width: 130px;
  padding: ${spacing.s100};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInfoItem = styled.div<StyledInfoItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
export {
  StyledRadioClient,
  StyledBannerImage,
  VerticalDivider,
  MobileToggle,
  MobileDropdown,
  StyledInfoItem,
};
