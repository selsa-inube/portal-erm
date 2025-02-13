import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn } from "@storybook/react";

import { AppPage } from ".";
import { AppProvider } from "@context/AppContext";
import { mockDataPortal } from "./config";

const meta: Meta<typeof AppPage> = {
  title: "layout/appPage",
  component: AppPage,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <AppProvider dataPortal={mockDataPortal}>
          <Story />
        </AppProvider>
      </BrowserRouter>
    ),
  ],
};

export const Default = () => <AppPage />;

export default meta;
