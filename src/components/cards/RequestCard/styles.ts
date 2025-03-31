import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledRequestCard {
  theme: typeof inube;
}

const StyledRequestCard = styled.div<IStyledRequestCard>`
  border-radius: 8px;
  box-shadow: 0px 2px 6px 1px
    ${({ theme }) => theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${spacing.s100};
  height: 207px;
  justify-content: space-between;
  padding: ${spacing.s150};
  user-select: none;
  width: 280px;
`;

const StyledTitle = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.blue?.B50 || inube.palette.blue.B50};
  border-radius: 4px;
  gap: ${spacing.s100};
  height: "20px";
  justify-content: "center";
  padding-left: ${spacing.s075};
  padding-right: ${spacing.s075};
  text-align: center;
`;

export { StyledRequestCard, StyledTitle };
