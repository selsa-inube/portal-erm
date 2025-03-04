import { useState } from "react";

import { FileAttachmentUI } from "./interface";
import { AttachDocumentModal } from "../../modals/AttachDocumentModal";
import { DeleteAttachModal } from "../../modals/DeleteAttachModal";

interface FileAttachmentProps {
  onFileChange?: (file: File | undefined) => void;
}

function FileAttachment({ onFileChange }: FileAttachmentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | undefined>(undefined);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAttach = (file: File) => {
    setAttachedFile(file);
    if (onFileChange) {
      onFileChange(file);
    }
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = () => {
    setAttachedFile(undefined);
    if (onFileChange) {
      onFileChange(undefined);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <FileAttachmentUI
        onAttach={handleOpenModal}
        attachedFile={attachedFile}
        onDelete={handleOpenDeleteModal}
      />
      {isModalOpen && (
        <AttachDocumentModal
          onCloseModal={handleCloseModal}
          onAttach={handleAttach}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteAttachModal
          onCloseModal={handleCloseDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export { FileAttachment };
