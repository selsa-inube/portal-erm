import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface StyledInfoItemProps {
  theme: typeof inube;
  clickable?: boolean;
}

const IStyledWidgetBanner = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})<StyledInfoItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};

  &:hover {
    background-color: ${({ clickable, theme }) =>
      clickable
        ? (theme?.palette?.neutral?.N30 ?? inube.palette.neutral.N30)
        : "none"};
    border-radius: 4px;
    box-shadow: ${({ clickable }) =>
      clickable ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "none"};
    transition:
      background-color 0.3s ease,
      box-shadow 0.3s ease;
  }
`;

export { IStyledWidgetBanner };
