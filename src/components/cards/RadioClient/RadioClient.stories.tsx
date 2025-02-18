import { clientsDataMock } from "@mocks/login/clients.mock";

import { RadioClient, RadioClientProps } from "./index";

const story = {
  components: [RadioClient],
  title: "components/Cards/RadioClient",
  argTypes: {
    id: {
      control: { type: "text" },
      description: "Unique identifier for the radio option.",
    },
    name: {
      control: { type: "text" },
      description: "Name of the radio input, used to group radio options.",
    },
    value: {
      control: { type: "text" },
      description: "Value associated with the radio option.",
    },
    label: {
      control: { type: "text" },
      description: "Text label displayed next to the radio option.",
    },
    logo: {
      control: { type: "text" },
      description: "URL or string reference to the client logo.",
    },
    handleChange: {
      action: "checked",
      description: "Function called when the radio option is selected.",
    },
  },
};

const Default = (args: RadioClientProps) => <RadioClient {...args} />;

Default.args = {
  id: clientsDataMock[2].id,
  name: "client",
  value: clientsDataMock[2].name,
  label: clientsDataMock[2].name,
  logo: clientsDataMock[2].logo,
};

export default story;

export { Default };
