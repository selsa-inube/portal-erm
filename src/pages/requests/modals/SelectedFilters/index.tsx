import { Stack, Text, Tag } from "@inubekit/inubekit";

import { StyledContainerFilters } from "./styles";

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
            <Tag
              key={index}
              appearance="primary"
              label={filter}
              weight="strong"
              removable={!!onRemove}
              onClose={onRemove ? () => onRemove(filter) : undefined}
            />
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
