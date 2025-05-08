import { Meta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { VinculationBanner, VinculationBannerProps } from "./index";

const meta: Meta<typeof VinculationBanner> = {
  title: "components/VinculationBanner",
  component: VinculationBanner,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    status: {
      control: "select",
      options: [
        "Prospecto",
        "En proceso de vinculación",
        "En proceso de retiro",
        "Retirado",
        "Activo",
      ],
    },
  },
};

export const Default = (args: VinculationBannerProps) => (
  <VinculationBanner {...args} />
);

Default.args = {
  name: "José Manuel Hernández Díaz",
  status: "Activo",
  imageUrl: "url/dummy",
  redirectUrl: "/somewhere",
};

export default meta;
