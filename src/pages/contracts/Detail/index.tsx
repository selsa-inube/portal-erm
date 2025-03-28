import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { Stack, Icon } from "@inubekit/inubekit";

import { ActionModal } from "../Actions";

interface DetailProps {
  disableDeleteAction?: boolean;
  disableModifyAction?: boolean;
  disableRenewAction?: boolean;
  disableAddAction?: boolean;
  actionDescriptions?: Record<string, string>;
  onClickEdit?: () => void;
  onClickEliminate?: () => void;
  onClickAdd?: () => void;
  onClickRenew?: () => void;
  onInfoIconClick?: (description: string) => void;
}

export function Detail(props: DetailProps) {
  const {
    disableDeleteAction,
    disableModifyAction,
    disableRenewAction,
    disableAddAction,
    actionDescriptions,
    onClickEdit,
    onClickEliminate,
    onClickAdd,
    onClickRenew,
    onInfoIconClick,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Stack justifyContent="center">
      <Icon
        icon={<MdOutlineMoreVert />}
        appearance="dark"
        size="24px"
        onClick={() => setModalOpen(!modalOpen)}
        cursorHover
      />
      {modalOpen && (
        <ActionModal
          disableDeleteAction={disableDeleteAction}
          disableModifyAction={disableModifyAction}
          disableRenewAction={disableRenewAction}
          disableAddAction={disableAddAction}
          actionDescriptions={actionDescriptions}
          onClickEdit={onClickEdit}
          onClickEliminate={onClickEliminate}
          onClickAdd={onClickAdd}
          onClickRenew={onClickRenew}
          onClose={() => setModalOpen(false)}
          onInfoIconClick={onInfoIconClick}
        />
      )}
    </Stack>
  );
}
