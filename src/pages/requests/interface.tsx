import { useState, useEffect, useRef } from "react";
import {
  Input,
  Stack,
  Text,
  Icon,
  Button,
  useMediaQuery,
} from "@inubekit/inubekit";
import {
  MdSearch,
  MdOutlineFilterAltOff,
  MdOutlineFilterAlt,
  MdMoreVert,
  MdClear,
} from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { spacing } from "@design/tokens/spacing";
import { IRoute } from "@components/layout/AppMenu/types";
import { BoardSection } from "@components/layout/BoardSection";

import { FilterRequestModal } from "./modals/FilterRequestModal";
import { SelectedFilters } from "./modals/SelectedFilters.tsx";
import { assignmentOptions, statusOptions } from "./config";
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
}

const mockRequests = {
  pending: [],
  inProgress: [],
  completed: [],
};

function RequestsUI(props: RequestsUIProps) {
  const { appName, appRoute, navigatePage } = props;
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeFilterModal = () => setIsFilterModalOpen(false);
  const isMobile = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <SearchContainer>
        <StyledTextfieldContainer>
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
                  <StyledMenuIconContainer>
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
                    <StyledMenuContainer ref={menuRef}>
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
              <StyledRequestsContainer>
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

      <StyledBoardContainer>
        <BoardSection
          sectionTitle="Por evaluar"
          sectionBackground="gray"
          orientation={isMobile ? "horizontal" : "vertical"}
          sectionInformation={mockRequests.pending}
          errorLoadingPins={false}
          searchRequestValue=""
          CardComponent={() => <Text>No hay solicitudes en trámite.</Text>}
        />
        <BoardSection
          sectionTitle="En progreso"
          sectionBackground="light"
          orientation={isMobile ? "horizontal" : "vertical"}
          sectionInformation={mockRequests.inProgress}
          errorLoadingPins={false}
          searchRequestValue=""
          CardComponent={() => <Text>No hay solicitudes en trámite.</Text>}
        />
        <BoardSection
          sectionTitle="Terminada"
          sectionBackground="gray"
          orientation={isMobile ? "horizontal" : "vertical"}
          sectionInformation={mockRequests.completed}
          errorLoadingPins={false}
          searchRequestValue=""
          CardComponent={() => <Text>No hay solicitudes en trámite.</Text>}
        />
      </StyledBoardContainer>
    </AppMenu>
  );
}

export { RequestsUI };
