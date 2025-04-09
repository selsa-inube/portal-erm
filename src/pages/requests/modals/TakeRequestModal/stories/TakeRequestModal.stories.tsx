import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { TakeRequestModal, TakeRequestModalProps } from "..";

const story: Meta<typeof TakeRequestModal> = {
  component: TakeRequestModal,
  title: "modals/TakeRequestModal",
};

const DefaultTemplate: StoryFn<TakeRequestModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && (
        <TakeRequestModal {...args} onCloseModal={handleShowModal} />
      )}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  portalId: "portal",
};

export default story;
