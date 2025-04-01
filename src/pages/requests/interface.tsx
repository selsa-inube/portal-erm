import { Input, Stack, Text, Icon, Button } from "@inubekit/inubekit";
import {
  MdSearch,
  MdOutlineFilterAltOff,
  MdOutlineFilterAlt,
  MdMoreVert,
  MdClear,
} from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { spacing } from "@design/tokens/spacing";
import { BoardSection } from "@components/layout/BoardSection";

import { IRoute, IOption } from "./types";
import { boardSections } from "./config";
import { FilterRequestModal } from "./modals/FilterRequestModal";
import { SelectedFilters } from "./modals/SelectedFilters";
import {
  StyledTextfieldContainer,
  StyledRequestsContainer,
  StyledBoardContainer,
  SearchContainer,
  StyledMenuContainer,
  StyledMenuButton,
  StyledMenuIconContainer,
} from "./styles";

interface RequestsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  isFilterModalOpen: boolean;
  isMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  assignmentOptions: IOption[];
  statusOptions: IOption[];
}

function RequestsUI(props: RequestsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    isFilterModalOpen,
    isMenuOpen,
    menuRef,
    isMobile,
    openFilterModal,
    closeFilterModal,
    setIsMenuOpen,
    assignmentOptions,
    statusOptions,
  } = props;

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <SearchContainer $isMobile={isMobile}>
        <StyledTextfieldContainer $isMobile={isMobile}>
          <Stack gap={spacing.s150} direction="column">
            <Stack direction="row" width="100%" alignItems="center">
              <Input
                id="seeker"
                placeholder="Palabra clave"
                iconAfter={<MdSearch size={20} />}
                size="compact"
                fullwidth={isMobile}
              />
              {isMobile && (
                <Stack>
                  <StyledMenuIconContainer $isMobile={isMobile}>
                    <Icon
                      appearance="dark"
                      icon={<MdMoreVert />}
                      cursorHover={true}
                      parentHover={false}
                      disabled={false}
                      spacing="narrow"
                      variant="empty"
                      size="24px"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                      }}
                    />
                  </StyledMenuIconContainer>
                  {isMenuOpen && (
                    <StyledMenuContainer $isMobile={isMobile} ref={menuRef}>
                      <StyledMenuButton onClick={openFilterModal}>
                        <Icon
                          appearance="primary"
                          icon={<MdOutlineFilterAlt />}
                          spacing="narrow"
                          variant="empty"
                          size="24px"
                        />
                        <Text size="medium">Filtrar (0)</Text>
                        <Stack margin="0px 0px 0px 25px">
                          <Icon
                            icon={<MdClear />}
                            size="18px"
                            cursorHover
                            appearance="dark"
                            onClick={(e) => {
                              e.stopPropagation();
                              closeFilterModal();
                              setIsMenuOpen(false);
                            }}
                          />
                        </Stack>
                      </StyledMenuButton>
                    </StyledMenuContainer>
                  )}
                </Stack>
              )}
            </Stack>

            {!isMobile && (
              <StyledRequestsContainer $isMobile={isMobile}>
                <SelectedFilters filters={[]} />
                <Button
                  appearance="gray"
                  iconBefore={<MdOutlineFilterAltOff />}
                  type="button"
                  spacing="wide"
                  variant="outlined"
                >
                  Quitar
                </Button>
                <Button
                  appearance="primary"
                  iconBefore={<MdOutlineFilterAlt />}
                  type="button"
                  spacing="wide"
                  variant="outlined"
                  onClick={openFilterModal}
                >
                  Filtrar
                </Button>
              </StyledRequestsContainer>
            )}
          </Stack>
        </StyledTextfieldContainer>
      </SearchContainer>

      {isFilterModalOpen && (
        <FilterRequestModal
          portalId="portal"
          assignmentOptions={assignmentOptions}
          statusOptions={statusOptions}
          onCloseModal={closeFilterModal}
          onSubmit={(values) => {
            console.log("Filtro aplicado:", values);
            closeFilterModal();
          }}
        />
      )}

      <StyledBoardContainer $isMobile={isMobile}>
        {boardSections.map(
          ({ sectionTitle, sectionBackground, sectionInformation }) => (
            <BoardSection
              key={sectionTitle}
              sectionTitle={sectionTitle}
              sectionBackground={sectionBackground}
              orientation={isMobile ? "horizontal" : "vertical"}
              sectionInformation={sectionInformation}
              errorLoadingPins={false}
              searchRequestValue=""
              CardComponent={() => <Text>No hay solicitudes en trámite.</Text>}
            />
          ),
        )}
      </StyledBoardContainer>
    </AppMenu>
  );
}

export { RequestsUI };
