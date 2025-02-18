import styled from "styled-components";

import { spacing } from "@design/tokens/spacing";

interface StyledClientsListProps {
  $scroll?: boolean;
}

const StyledClients = styled.div`
  & form {
    & > div {
      margin: 48px auto 0px;
      width: 500px;
      @media screen and (max-width: 532px) {
        width: auto;
      }
    }
  }

  & button {
    margin-top: ${spacing.s300};
  }
`;

const StyledClientsList = styled.div<StyledClientsListProps>`
  & > div {
    list-style: none;
    min-height: 300px;
    max-height: 430px;
    width: inherit;
    overflow-y: ${({ $scroll }) => ($scroll ? "scroll" : "visible")};
    @media screen and (max-height: 1000px) {
      min-height: 200px;
    }
  }
`;

const StyledNoResults = styled.div`
  margin: ${spacing.s200} ${spacing.s0};
`;

const StyledClientsItem = styled.li`
  width: 100%;
`;

export { StyledClients, StyledClientsList, StyledNoResults, StyledClientsItem };
