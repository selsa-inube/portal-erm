import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { FlagProvider, Button } from "@inubekit/inubekit";

import { TextAreaModal, TextAreaModalProps } from "..";
import { props } from "./props";
import { useErrorFlag } from "@hooks/useErrorFlag";

const story: Meta<typeof TextAreaModal> = {
  component: TextAreaModal,
  title: "components/modals/TextAreaModal",
  argTypes: props,
  decorators: [
    (Story) => (
      <FlagProvider>
        <Story />
      </FlagProvider>
    ),
  ],
};

const DefaultTemplate: StoryFn<TextAreaModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (values: { textarea: string }) => {
    console.log("Registro eliminado con justificación:", values.textarea);
    setShowModal(false);
    setShowFlag(false);
    setTimeout(() => {
      setShowFlag(true);
    }, 10);
  };

  useErrorFlag(
    showFlag,
    "La solicitud se ha eliminado correctamente",
    "Solicitud eliminada",
  );

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && (
        <TextAreaModal
          {...args}
          onSubmit={handleDelete}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: "Eliminación",
  buttonText: "Eliminar",
  inputLabel: "Justificación",
  inputPlaceholder: "¿Por qué eliminarás el registro?",
  maxLength: 200,
  portalId: "portal",
};

export default story;
