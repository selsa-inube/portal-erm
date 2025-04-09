import { MdOutlineChevronRight } from "react-icons/md";
import { Stack, Icon, Text } from "@inubekit/inubekit";

import { StyledBoardSection, StyledCollapseIcon } from "./styles";
import { useBoardSectionLogic } from "./interface";
import { ICreditRequest, IBoardSectionProps } from "./types";

function BoardSection(props: IBoardSectionProps) {
  const {
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    sectionInformation,
    children, // contenido viene desde el padre
  } = props;

  const { collapse, handleCollapse, getNoDataMessage, isTablet, isMobile } =
    useBoardSectionLogic(props);

  const isVertical = orientation === "vertical";
  const isEmpty = sectionInformation.length === 0;
  const isCollapsed = collapse || isVertical;
  const disabledCollapse = isEmpty;
  const titleType = isVertical || isMobile ? "title" : "headline";
  const titleSize = isVertical || isMobile ? "large" : "medium";

  return (
    <StyledBoardSection
      $sectionBackground={sectionBackground}
      $orientation={orientation}
      $isTablet={isTablet}
    >
      <Stack
        justifyContent={isVertical ? "space-between" : "flex-start"}
        alignItems="end"
        gap="24px"
      >
        <Stack alignItems="end" gap="8px">
          {!isVertical && (
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
          <Text type={titleType} size={titleSize}>
            {sectionTitle}
          </Text>
        </Stack>

        <Text type="title" size="medium">
          {sectionInformation.length}/{sectionInformation.length || 0}
        </Text>
      </Stack>

      {isCollapsed && (
        <Stack
          wrap="wrap"
          alignItems="center"
          direction={isVertical ? "column" : "row"}
          justifyContent="center"
          gap="20px"
        >
          {!isEmpty ? (
            children
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
export type { IBoardSectionProps, ICreditRequest };
