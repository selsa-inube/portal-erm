import styled from "styled-components";

interface StyledInfoItemProps {
  clickable?: boolean;
}

const IStyledWidgetBanner = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "clickable",
})<StyledInfoItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

export { IStyledWidgetBanner };
