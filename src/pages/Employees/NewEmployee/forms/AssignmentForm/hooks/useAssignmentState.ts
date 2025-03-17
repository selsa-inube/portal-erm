import { useState } from "react";
import { IOption } from "@inubekit/inubekit";

import { currencyFormat } from "@utils/forms/currency";

import { FormValues } from "../modals/AddAssignmentModal/types";

export const useAssignmentState = (assignmentOptions: IOption[]) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignments, setAssignments] = useState([
    {
      title: "Asignación 1",
      assignment: "Salario básico.",
      value: "$ 1.800.000",
    },
    {
      title: "Asignación 2",
      assignment: "Auxilio de conectividad.",
      value: "$ 240.000",
    },
  ]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitAssignment = (values: FormValues) => {
    const selectedOption = assignmentOptions.find(
      (option) => option.value === values.assignment,
    );

    setAssignments((prev) => [
      ...prev,
      {
        title: `Asignación ${prev.length + 1}`,
        assignment: selectedOption?.label ?? values.assignment,
        value: currencyFormat(values.value),
      },
    ]);

    handleCloseModal();
  };

  return {
    assignments,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleSubmitAssignment,
  };
};
