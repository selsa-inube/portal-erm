import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import { SelectedFilters } from "..";

const story: Meta<typeof SelectedFilters> = {
  component: SelectedFilters,
  title: "components/cards/SelectedFilters",
};

const Template: StoryFn<typeof SelectedFilters> = (args) => {
  const [filters, setFilters] = useState(args.filters);

  const handleRemove = (filterToRemove: string) => {
    setFilters(filters.filter((filter) => filter !== filterToRemove));
  };

  return <SelectedFilters filters={filters} onRemove={handleRemove} />;
};

export const Default = Template.bind({});
Default.args = {
  filters: ["Incapacidad (2)", "Vacaciones (1)"],
};

export const Empty = Template.bind({});
Empty.args = {
  filters: [],
};

export default story;
