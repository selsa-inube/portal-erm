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
import { RequestCard } from "@components/cards/RequestCard";
import { FilterRequestModal } from "@components/modals/FilterRequestModal";
import { SelectedFilters } from "@components/cards/SelectedFilters";

import { IRoute, IOption } from "./types";
import { boardSections } from "./config";
import {
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
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  debouncedSearchTerm: string;
  selectedFilters: IOption[];
  setSelectedFilters: (filters: IOption[]) => void;
}

function RequestsUI({
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
  setSearchTerm,
  debouncedSearchTerm,
  selectedFilters,
  setSelectedFilters,
}: RequestsUIProps) {
  const handleRemove = (filterValueToRemove: string) => {
    setSelectedFilters(
      selectedFilters.filter((filter) => filter.value !== filterValueToRemove),
    );
  };

  const selectedStatusFilters = selectedFilters.filter((filter) =>
    statusOptions.some((status) => status.value === filter.value),
  );

  const selectedAssignmentFilters = selectedFilters.filter((filter) =>
    assignmentOptions.some((assignment) => assignment.value === filter.value),
  );

  const handleApplyFilters = (values: { filters?: IOption[] }) => {
    setSelectedFilters(values.filters ?? []);
    closeFilterModal();
  };

  return (
    <AppMenu
      appName={appName}
      appRoute={appRoute}
      navigatePage={navigatePage}
      isMobile={isMobile}
    >
      <SearchContainer $isMobile={isMobile}>
        <Stack gap={spacing.s150} direction="column" width="100%">
          <Stack
            direction="row"
            gap={spacing.s150}
            padding={
              isMobile
                ? `${spacing.s0} ${spacing.s0} ${spacing.s150} ${spacing.s0}`
                : spacing.s0
            }
          >
            <Input
              id="seeker"
              placeholder="Palabra clave"
              iconAfter={<MdSearch size={20} />}
              size="compact"
              fullwidth={isMobile}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            {isMobile && (
              <>
                <StyledMenuIconContainer $isMobile={isMobile}>
                  <Icon
                    appearance="dark"
                    icon={<MdMoreVert />}
                    cursorHover
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
                      <Text size="medium">
                        Filtrar ({selectedFilters.length})
                      </Text>
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
              </>
            )}
          </Stack>

          {!isMobile && (
            <StyledRequestsContainer $isMobile={isMobile}>
              <SelectedFilters
                onRemove={handleRemove}
                filters={selectedFilters.map((filter) => filter.value)}
              />
              <Button
                appearance="gray"
                iconBefore={<MdOutlineFilterAltOff />}
                type="button"
                spacing="wide"
                variant="outlined"
                onClick={() => setSelectedFilters([])}
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
      </SearchContainer>

      {isFilterModalOpen && (
        <FilterRequestModal
          portalId="portal"
          assignmentOptions={assignmentOptions}
          statusOptions={statusOptions}
          onCloseModal={closeFilterModal}
          onSubmit={handleApplyFilters}
        />
      )}

      <StyledBoardContainer $isMobile={isMobile}>
        {boardSections
          .filter(({ value }) => {
            return (
              selectedStatusFilters.length === 0 ||
              selectedStatusFilters.some((filter) => filter.value === value)
            );
          })
          .map(({ sectionTitle, sectionBackground, sectionInformation }) => {
            const filteredRequests = sectionInformation.filter(
              ({ id, title, requestDate, responsible }) => {
                const matchesSearch = [
                  id,
                  title,
                  requestDate,
                  responsible,
                ].some((field) =>
                  field?.toString().toLowerCase().includes(debouncedSearchTerm),
                );

                const matchesAssignment =
                  selectedAssignmentFilters.length === 0 ||
                  selectedAssignmentFilters.some((assignment) =>
                    title
                      .toLowerCase()
                      .includes(assignment.label.toLowerCase()),
                  );

                return matchesSearch && matchesAssignment;
              },
            );

            return (
              <BoardSection
                key={sectionTitle}
                sectionTitle={sectionTitle}
                sectionBackground={sectionBackground}
                orientation={isMobile ? "horizontal" : "vertical"}
                sectionInformation={filteredRequests}
                errorLoadingPins={false}
                searchRequestValue={debouncedSearchTerm}
                CardComponent={() =>
                  filteredRequests.length > 0 ? (
                    filteredRequests.map(
                      ({
                        id,
                        title,
                        requestDate,
                        responsible,
                        hasResponsible,
                      }) => (
                        <RequestCard
                          key={id}
                          id={id}
                          title={title}
                          requestDate={requestDate}
                          responsible={responsible}
                          hasResponsible={hasResponsible}
                        />
                      ),
                    )
                  ) : (
                    <Text>
                      No hay solicitudes que coincidan con los filtros
                      seleccionados.
                    </Text>
                  )
                }
              />
            );
          })}
      </StyledBoardContainer>
    </AppMenu>
  );
}

export { RequestsUI };
