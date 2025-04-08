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

export interface RequestsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  isFilterModalOpen: boolean;
  isMenuOpen: boolean;
  isMobile: boolean;
  isSmallMobile: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  assignmentOptions: IOption[];
  statusOptions: IOption[];
  searchTerm: string;
  debouncedSearchTerm: string;
  selectedFilters: IOption[];
  openFilterModal: () => void;
  closeFilterModal: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  setSearchTerm: (term: string) => void;
  setSelectedFilters: (filters: IOption[]) => void;
}

function RequestsUI({
  appName,
  appRoute,
  navigatePage,
  isFilterModalOpen,
  isMenuOpen,
  isMobile,
  isSmallMobile,
  menuRef,
  assignmentOptions,
  statusOptions,
  debouncedSearchTerm,
  selectedFilters,
  openFilterModal,
  closeFilterModal,
  setIsMenuOpen,
  setSearchTerm,
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

  const getFilterCount = (filter: IOption) => {
    const isStatusFilter = statusOptions.some(
      (status) => status.value === filter.value,
    );
    const isAssignmentFilter = assignmentOptions.some(
      (assignment) => assignment.value === filter.value,
    );

    return boardSections
      .flatMap(({ value: sectionStatus, sectionInformation }) =>
        sectionInformation.map((info) => ({
          ...info,
          status: sectionStatus,
        })),
      )
      .filter((info) => {
        if (isStatusFilter) {
          return info.status.toLowerCase() === filter.value.toLowerCase();
        }

        if (isAssignmentFilter) {
          return info.title.toLowerCase().includes(filter.value.toLowerCase());
        }

        return false;
      }).length;
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
                  <StyledMenuContainer
                    $isSmallMobile={isSmallMobile}
                    $isMobile={isMobile}
                    ref={menuRef}
                  >
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
                      <Stack
                        margin={`${spacing.s0} ${spacing.s0} ${spacing.s0} ${spacing.s300}`}
                      >
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
                filters={selectedFilters.map((filter) => ({
                  label: filter.label,
                  type: statusOptions.some(
                    (status) => status.value === filter.value,
                  )
                    ? "status"
                    : "assignment",
                  count: getFilterCount(filter),
                }))}
              />
              <Button
                appearance="gray"
                iconBefore={<MdOutlineFilterAltOff />}
                type="button"
                spacing="wide"
                variant="outlined"
                disabled={selectedFilters.length === 0}
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
          onClearFilters={() => setSelectedFilters([])}
          onSubmit={handleApplyFilters}
          selectedFilters={selectedFilters.map((filter) => ({
            ...filter,
            count: getFilterCount(filter),
          }))}
          onRemoveFilter={handleRemove}
        />
      )}

      <StyledBoardContainer $isMobile={isMobile}>
        {boardSections.map(
          ({ value, sectionTitle, sectionBackground, sectionInformation }) => {
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

                const matchesStatus =
                  selectedStatusFilters.length === 0 ||
                  selectedStatusFilters.some(
                    (filter) =>
                      filter.value.toLowerCase() === value.toLowerCase(),
                  );

                return matchesSearch && matchesAssignment && matchesStatus;
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
          },
        )}
      </StyledBoardContainer>
    </AppMenu>
  );
}

export { RequestsUI };
