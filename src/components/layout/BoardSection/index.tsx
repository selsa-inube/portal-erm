import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { Stack, Icon, Text, useMediaQueries } from "@inubekit/inubekit";

import { StyledBoardSection, StyledCollapseIcon } from "./styles";
import { SectionBackground, SectionOrientation } from "./types";
import { configOption } from "./config";

interface CreditRequest {
  creditRequestCode?: string;
  clientName?: string;
  creditRequestDateOfCreation?: string;
  userWhoPinnnedId?: string;
  title: string;
  count: string;
  message: string;
}

interface BoardSectionProps {
  sectionTitle: string;
  sectionBackground: SectionBackground;
  orientation: SectionOrientation;
  sectionInformation: CreditRequest[];
  errorLoadingPins: boolean;
  searchRequestValue: string;
  CardComponent: React.FC<{ request: CreditRequest }>;
}

function BoardSection(props: BoardSectionProps) {
  const {
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    sectionInformation,
    searchRequestValue,
    CardComponent,
  } = props;
  const disabledCollapse = sectionInformation.length === 0;

  const { "(max-width: 1024px)": isTablet, "(max-width: 595px)": isMobile } =
    useMediaQueries(["(max-width: 1024px)", "(max-width: 595px)"]);

  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    if (!disabledCollapse) {
      setCollapse(!collapse);
    }
  };

  const getNoDataMessage = () => {
    if (!sectionInformation || sectionInformation.length === 0) {
      return searchRequestValue
        ? `${configOption.noMatches} "${searchRequestValue}"`
        : `${configOption.textNodata}`;
    }
    return "";
  };

  return (
    <StyledBoardSection
      $sectionBackground={sectionBackground}
      $orientation={orientation}
      $isTablet={isTablet}
    >
      <Stack
        justifyContent={
          orientation === "vertical" ? "space-between" : "flex-start"
        }
        alignItems="end"
        gap="24px"
      >
        <Stack
          alignItems="end"
          gap="8px"
          width={orientation === "vertical" ? "180px" : "auto"}
          height={orientation === "vertical" ? "56px" : "auto"}
        >
          {orientation !== "vertical" && (
            <StyledCollapseIcon
              $collapse={collapse}
              $disabledCollapse={disabledCollapse}
              onClick={handleCollapse}
            >
              <Icon
                icon={<MdOutlineChevronRight />}
                disabled={disabledCollapse}
                appearance="dark"
                size="26px"
                cursorHover
              />
            </StyledCollapseIcon>
          )}
          <Text
            type={orientation === "vertical" || isMobile ? "title" : "headline"}
            size={orientation === "vertical" || isMobile ? "large" : "medium"}
          >
            {sectionTitle}
          </Text>
        </Stack>
        <Text type="title" size="medium">
          {sectionInformation.length}/{sectionInformation.length || 0}
        </Text>
      </Stack>
      {(collapse || orientation === "vertical") && (
        <Stack
          wrap="wrap"
          alignItems="center"
          direction={orientation === "vertical" ? "column" : "row"}
          justifyContent={isMobile ? "center" : "flex-start"}
          gap="20px"
        >
          {sectionInformation.length > 0 ? (
            sectionInformation.map((request, index) => (
              <CardComponent key={index} request={request} />
            ))
          ) : (
            <Stack
              gap="24px"
              alignItems="center"
              justifyContent="center"
              height="533px"
              width="100%"
            >
              <Text type="title" size="small" appearance="gray">
                {getNoDataMessage()}
              </Text>
            </Stack>
          )}
        </Stack>
      )}
    </StyledBoardSection>
  );
}

export { BoardSection };
export type { BoardSectionProps, CreditRequest };
