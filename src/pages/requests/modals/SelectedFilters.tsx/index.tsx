import { Stack, Text, Icon } from "@inubekit/inubekit";
import { StyledContainerFilters, StyledFilterChip } from "./styles";
import { MdOutlineClose } from "react-icons/md";

interface SelectedFiltersProps {
  filters: string[];
  onRemove?: (filter: string) => void;
}

function SelectedFilters({ filters, onRemove }: SelectedFiltersProps) {
  return (
    <StyledContainerFilters>
      {filters.length > 0 ? (
        <Stack direction="row" gap="8px">
          {filters.map((filter, index) => (
            <StyledFilterChip key={index}>
              <Text size="small" appearance="light">
                {filter}
              </Text>
              {onRemove && (
                <Icon
                  appearance="light"
                  icon={<MdOutlineClose />}
                  cursorHover={true}
                  parentHover={false}
                  disabled={false}
                  spacing="narrow"
                  variant="empty"
                  size="16px"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(filter);
                  }}
                />
              )}
            </StyledFilterChip>
          ))}
        </Stack>
      ) : (
        <Text type="label" size="small" appearance="gray">
          Sin filtros aún.
        </Text>
      )}
    </StyledContainerFilters>
  );
}

export { SelectedFilters };
