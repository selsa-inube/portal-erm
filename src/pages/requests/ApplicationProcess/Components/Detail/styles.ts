import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledActions {
  theme: typeof inube;
  $isMobile?: boolean;
}

const StyledDetail = styled.div<IStyledActions>`
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  top: ${({ $isMobile }) => ($isMobile ? "170px" : "190px")};
  right: ${({ $isMobile }) => ($isMobile ? "20px" : "65px")};
`;

export { StyledDetail };
