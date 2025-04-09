import { useState } from "react";
import { useMediaQueries } from "@inubekit/inubekit";

import { configOption } from "./config";
import { IBoardSectionProps } from "./types";

interface BoardSectionLogic {
  collapse: boolean;
  handleCollapse: () => void;
  getNoDataMessage: () => string;
  isTablet: boolean;
  isMobile: boolean;
}

function useBoardSectionLogic(props: IBoardSectionProps): BoardSectionLogic {
  const { sectionInformation, searchRequestValue } = props;

  const isEmpty = sectionInformation.length === 0;

  const { "(max-width: 1024px)": isTablet, "(max-width: 595px)": isMobile } =
    useMediaQueries(["(max-width: 1024px)", "(max-width: 595px)"]);

  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    if (!isEmpty) setCollapse((prev) => !prev);
  };

  const getNoDataMessage = () =>
    isEmpty
      ? searchRequestValue
        ? configOption.noMatches
        : configOption.textNodata
      : "";

  return {
    collapse,
    handleCollapse,
    getNoDataMessage,
    isTablet,
    isMobile,
  };
}

export { useBoardSectionLogic };
