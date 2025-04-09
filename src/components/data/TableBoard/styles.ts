import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

interface IStyledContainer {
  $borderTable: boolean;
  $isTablet: boolean;
  $actionsMobile: boolean;
}
interface IStyledThactions {
  $isTablet?: boolean;
  $isFirst?: boolean;
}

interface IStyledTdactions {
  $right?: number;
  $isTablet?: boolean;
  $isFirst?: boolean;
}

interface IStyledTable {
  $zebraEffect: boolean;
  $background: boolean;
  $isTablet: boolean;
}

interface IStyledTdbodyContainer {
  $borderTable?: boolean;
}

interface IStyledTd {
  $widthTd?: string;
}

export const StyledContainer = styled.div<IStyledContainer>`
  border-radius: 8px;
  max-width: 100%;
  position: relative;
  overflow-x: ${({ $isTablet }) => ($isTablet ? "auto" : "hidden")};
  border: ${({ theme, $borderTable }) =>
    $borderTable &&
    `2px solid ${theme?.palette?.neutral?.N40 || inube.palette.neutral.N40}`};
  overflow: visible;
`;

export const StyledThactions = styled.th<IStyledThactions>`
  ${({ $isTablet, $isFirst, theme }) =>
    $isTablet &&
    `position: sticky; background-color: white; text-align: end; ${
      $isFirst &&
      `&::before { content: ""; position: absolute; top: 0; left: -2px; width: 2px; height: 100%;  box-shadow: 0px 1px 3px 1px #DFE1E6; background-color: ${theme?.palette?.neutral?.N100 || inube.palette.neutral.N100}; }`
    }`}
`;

export const StyledTdactions = styled.td<IStyledTdactions>`
  text-align: center;
  ${({ $isTablet, $isFirst, theme }) =>
    $isTablet &&
    `position: sticky; ${
      $isFirst &&
      `&::before { content: ""; position: absolute; top: 0; left: -2px; width: 2px; height: 100%; box-shadow: 0px 1px 3px 1px #DFE1E6; background-color: ${theme?.palette?.neutral?.N100 || inube.palette.neutral.N100}; }`
    }`}
`;

export const StyledTable = styled.table<IStyledTable>`
  border-collapse: collapse;
  width: 100%;
  box-sizing: border-box;

  tbody tr {
    background-color: ${({ theme, $background }) =>
      $background
        ? theme?.palette?.neutral?.N30 || inube.palette.neutral.N30
        : theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  }

  thead th {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  }

  ${({ $zebraEffect, theme, $background }) =>
    $zebraEffect &&
    !$background &&
    `tbody tr:nth-child(even) {background-color: ${theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};}; tbody tr:nth-child(odd) {background-color: ${theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};}`}

  ${({ $isTablet, theme }) =>
    $isTablet &&
    `tbody tr {
      &:nth-child(even) ${StyledTdactions} {
        background-color: ${theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};};
      }
      &:nth-child(odd) ${StyledTdactions} {
        background-color: ${theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
      }
      
    }`}
`;

export const StyledTbody = styled.tbody`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

export const StyledThead = styled.thead`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

export const StyledTh = styled.th`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
  padding: ${spacing.s050};
`;

export const StyledTr = styled.tr<IStyledTdbodyContainer>`
  vertical-align: middle;
  white-space: normal;
  box-sizing: border-box;
  border-bottom: ${({ theme, $borderTable }) =>
    $borderTable &&
    `1px solid ${theme?.palette?.neutral?.N40 || inube.palette.neutral.N40}`};

  & svg {
    padding: 0px;
  }
`;

export const StyledTd = styled.td<IStyledTd>`
  width: ${({ $widthTd }) => $widthTd};
  height: 24px;
  padding: ${spacing.s050};
`;
