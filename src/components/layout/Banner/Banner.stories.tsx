import { Meta } from "@storybook/react";
import { VinculacionBanner, VinculacionBannerProps } from "./index";

const meta: Meta<typeof VinculacionBanner> = {
  title: "components/VinculacionBanner",
  component: VinculacionBanner,
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

export const Default = (args: VinculacionBannerProps) => (
  <VinculacionBanner {...args} />
);

Default.args = {
  name: "José Manuel Hernández Díaz",
  status: "Activo",
  onVinculate: () => alert("Vinculación agregada"),
};

export default meta;
