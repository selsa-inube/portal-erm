import { Stack, Text, Icon } from "@inubekit/inubekit";
import { MdOutlineInfo } from "react-icons/md";

import { StyledContainer, StyledLi, StyledUl, StyledActions } from "./styles";
import { Actions } from "./config";

interface ActionModalProps {
  onClickEdit?: () => void;
  onClickEliminate?: () => void;
  onClickAdd?: () => void;
  onClickRenew?: () => void;
  disableDeleteAction?: boolean;
  disableModifyAction?: boolean;
  disableRenewAction?: boolean;
  disableAddAction?: boolean;
}

export function ActionModal(props: ActionModalProps) {
  const {
    onClickEdit,
    onClickEliminate,
    onClickAdd,
    onClickRenew,
    disableDeleteAction,
    disableModifyAction,
    disableRenewAction,
    disableAddAction,
  } = props;

  const actionsLi = Actions(
    onClickAdd,
    onClickEdit,
    onClickRenew,
    onClickEliminate,
  );

  const addActionIndex = actionsLi.findIndex(
    (item) => item.label === "Agregar",
  );
  if (addActionIndex !== -1) {
    actionsLi[addActionIndex].onClick = onClickAdd;
    actionsLi[addActionIndex].isDisabled = disableAddAction ?? !onClickAdd;
    if (actionsLi[addActionIndex].isDisabled) {
      actionsLi[addActionIndex].appearance = "gray";
    }
  }

  const modifyActionIndex = actionsLi.findIndex(
    (item) => item.label === "Modificar",
  );
  if (modifyActionIndex !== -1) {
    actionsLi[modifyActionIndex].onClick = onClickEdit;
    actionsLi[modifyActionIndex].isDisabled =
      disableModifyAction ?? !onClickEdit;
    if (actionsLi[modifyActionIndex].isDisabled) {
      actionsLi[modifyActionIndex].appearance = "gray";
    }
  }

  const renewActionIndex = actionsLi.findIndex(
    (item) => item.label === "Renovar",
  );
  if (renewActionIndex !== -1) {
    actionsLi[renewActionIndex].onClick = onClickRenew;
    actionsLi[renewActionIndex].isDisabled =
      disableRenewAction ?? !onClickRenew;
    if (actionsLi[renewActionIndex].isDisabled) {
      actionsLi[renewActionIndex].appearance = "gray";
    }
  }

  const deleteActionIndex = actionsLi.findIndex(
    (item) => item.label === "Terminar",
  );
  if (deleteActionIndex !== -1) {
    actionsLi[deleteActionIndex].onClick = onClickEliminate;
    actionsLi[deleteActionIndex].isDisabled =
      disableDeleteAction ?? !onClickEliminate;
    if (actionsLi[deleteActionIndex].isDisabled) {
      actionsLi[deleteActionIndex].appearance = "gray";
    } else {
      actionsLi[deleteActionIndex].appearance = "danger";
    }
  }

  return (
    <StyledContainer>
      <StyledActions>
        <Stack>
          <StyledUl>
            {actionsLi.map((item, index) => (
              <StyledLi
                key={index}
                onClick={(event) => {
                  if (item.isDisabled) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                  }
                  item.onClick?.();
                }}
                $isDisabled={item.isDisabled}
              >
                <Icon
                  icon={item.icon}
                  appearance={item.appearance}
                  disabled={item.isDisabled}
                  size="18px"
                />
                <Text
                  size="medium"
                  appearance={item.isDisabled ? "gray" : "dark"}
                >
                  {item.label}
                </Text>
                {item.isDisabled && (
                  <Icon
                    icon={<MdOutlineInfo />}
                    appearance="primary"
                    size="16px"
                    cursorHover
                  />
                )}
              </StyledLi>
            ))}
          </StyledUl>
        </Stack>
      </StyledActions>
    </StyledContainer>
  );
}
