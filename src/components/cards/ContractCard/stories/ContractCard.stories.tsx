import { BrowserRouter } from "react-router-dom";
import { StoryFn, Meta } from "@storybook/react";

import { ContractCard, ContractCardProps } from "..";

const meta: Meta<typeof ContractCard> = {
  component: ContractCard,
  title: "components/cards/ContractCard",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<ContractCardProps> = (args) => (
  <ContractCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  startDate: "02/Sep/2024",
  endDate: "31/Dic/2025",
  contractState: "Vigente",
  lastCharge: "Cargo anterior",
  lastSalary: 3290000,
  contractType: "Tiempo completo",
  normativeFramework: "Marco XYZ",
  company: "Empresa ABC",
};

export default meta;
