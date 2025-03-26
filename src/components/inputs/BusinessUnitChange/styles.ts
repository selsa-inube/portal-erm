import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

const StyledContainer = styled.div`
  box-shadow: 2px 2px 3px 2px
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  margin-left: 10px;
  z-index: 3;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0px;
  padding: 0px 2px;
`;

const StyledLi = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  &:hover {
    background-color: ${inube.palette.neutral.N30};
    border-radius: 8px;
  }
`;

const StyledContainerOption = styled.div`
  cursor: pointer;
`;

const StyledImg = styled.img`
  position: relative;
  width: 75px;
  height: auto;
  left: 5px;
  padding: 12px 12px 12px 8px;
  object-fit: contain;
`;

export {
  StyledContainer,
  StyledUl,
  StyledLi,
  StyledImg,
  StyledContainerOption,
};
