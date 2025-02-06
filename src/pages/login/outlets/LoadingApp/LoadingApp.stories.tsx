import { BrowserRouter } from "react-router-dom";

import { LoadingApp } from "./index";

const story = {
  components: [LoadingApp],
  title: "components/layouts/login/outlets/loading-app",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: React.ElementType) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Default = () => <LoadingApp />;

export default story;

export { Default };
