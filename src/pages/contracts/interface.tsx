import { useState } from "react";
import {
  useMediaQuery,
  Stack,
  Text,
  Button,
  Icon,
  Tag,
} from "@inubekit/inubekit";
import { MdOutlineAdd, MdOutlineInfo } from "react-icons/md";

import {
  ContractCard,
  ContractCardProps,
} from "@components/cards/ContractCard";
import { spacing } from "@design/tokens/spacing";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { contractCardMock } from "@mocks/contracts/contracts.mock";
import { RequestComponentDetail } from "@components/modals/ComponentDetailModal";
import { SelectModal } from "@components/modals/SelectModal";
import { InfoModal } from "@components/modals/InfoModal";
import { currencyFormat } from "@utils/forms/currency";

import {
  StyledContractsContainer,
  StyledSeparatorLine,
  StyledAddVinculation,
  StyledAddVinculationMobile,
} from "./styles";
import { Detail } from "./Detail";
import { ModalType } from "./types";

const assertNever = (value: string): never => {
  throw new Error(`Unhandled action type: ${value}`);
};

interface ContractsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  hasPendingRequest?: boolean;
  canCreateRequest?: boolean;
  canTerminate?: boolean;
  canRenew?: boolean;
  canModify?: boolean;
}

function ContractsUI(props: ContractsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    hasPendingRequest = false,
    canCreateRequest = false,
    canTerminate = true,
    canRenew = true,
    canModify = true,
  } = props;
  const isTablet = useMediaQuery("(max-width: 1235px)");
  const isMobile = useMediaQuery("(max-width: 550px)");

  const hasFixedEndDate = contractCardMock.some(
    (contract) => contract.endDate !== "Indefinido",
  );
  const sortedContracts = [...contractCardMock].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
  const hasValidContract = contractCardMock.some(
    (contract) => contract.isContractValid,
  );

  const [modals, setModals] = useState<Record<ModalType, boolean>>({
    terminate: false,
    renew: false,
    modify: false,
    detail: false,
  });
  const [selectedContract, setSelectedContract] = useState<ContractCardProps>();

  const [infoModal, setInfoModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({ open: false, title: "Información", description: "" });

  const openModal = (modal: ModalType) =>
    setModals((prev) => ({ ...prev, [modal]: true }));
  const closeModal = (modal: ModalType) =>
    setModals((prev) => ({ ...prev, [modal]: false }));

  const handleTerminate = () => {
    console.log("Terminate contract");
    openModal("terminate");
  };

  const handleRenew = () => {
    console.log("Renew contract");
    openModal("renew");
  };

  const handleModify = () => {
    console.log("Modify contract");
    openModal("modify");
  };

  const handleAddVinculation = () => {
    console.log("Agregar vinculación");
  };

  const handleDetailsClick = (contract: ContractCardProps) => {
    setSelectedContract(contract);
    openModal("detail");
  };

  const terminationOptions = contractCardMock
    .filter((contract) => contract.isContractValid)
    .map((contract, index) => ({
      id: index.toString(),
      label: `${contract.contractNumber} - ${contract.company}`,
      value: index.toString(),
    }));

  const renewOptions = contractCardMock
    .filter((contract) => contract.endDate !== "Indefinido")
    .map((contract, index) => ({
      id: index.toString(),
      label: `${contract.contractNumber} - ${contract.company}`,
      value: index.toString(),
    }));

  const modifyOptions = contractCardMock.map((contract, index) => ({
    id: index.toString(),
    label: `${contract.contractNumber} - ${contract.company}`,
    value: index.toString(),
  }));

  const commonSelectModalProps = {
    title: "Selecciona un contrato",
    description:
      "Selecciona el contrato sobre el que vas a ejecutar la acción seleccionada.",
    portalId: "portal",
    loading: false,
  };

  const handleSubmit =
    (action: ModalType) => (values: { selection: string }) => {
      console.log(`Selected option for ${action}:`, values);
      closeModal(action);
    };

  const openInfoModal = (description: string) => {
    setInfoModal({ open: true, title: "Información", description });
  };

  const getActionDescription = (action: string) => {
    switch (action) {
      case "terminate":
        return !canTerminate
          ? "No tiene privilegios para terminar contratos."
          : "No hay contrato vigente para terminar.";
      case "renew":
        return !canRenew
          ? "No tiene privilegios para renovar contratos."
          : !hasFixedEndDate
            ? "No hay contrato a término fijo."
            : "No hay contrato vigente para renovar.";
      case "modify":
        return !canModify
          ? "No tiene privilegios para modificar contratos."
          : "No hay contrato vigente para modificar.";
      case "add":
        return "No se puede agregar vinculación, ya que no tiene privilegios para ejecutar esta acción.";
      default:
        return assertNever(action);
    }
  };

  const actionDescriptions = {
    Terminar: getActionDescription("terminate"),
    Renovar: getActionDescription("renew"),
    Modificar: getActionDescription("modify"),
    Agregar: getActionDescription("add"),
  };

  return (
    <>
      <AppMenu
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <StyledContractsContainer $isMobile={isMobile}>
          <Stack justifyContent="space-between">
            <Text type="title" size="medium">
              Consulta histórica de contratos
            </Text>
            {isTablet ? (
              <Detail
                onClickEdit={hasValidContract ? handleModify : undefined}
                onClickEliminate={
                  hasValidContract ? handleTerminate : undefined
                }
                onClickAdd={canCreateRequest ? handleAddVinculation : undefined}
                onClickRenew={
                  hasFixedEndDate && hasValidContract ? handleRenew : undefined
                }
                disableModifyAction={!hasValidContract || !canModify}
                disableRenewAction={
                  !hasFixedEndDate || !hasValidContract || !canRenew
                }
                disableDeleteAction={!hasValidContract || !canTerminate}
                disableAddAction={!canCreateRequest}
                actionDescriptions={actionDescriptions}
                onInfoIconClick={openInfoModal}
              />
            ) : (
              <Stack gap={spacing.s150}>
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    appearance="danger"
                    spacing="compact"
                    variant="outlined"
                    disabled={!hasValidContract || !canTerminate}
                    cursorHover
                    onClick={
                      hasValidContract && canTerminate
                        ? handleTerminate
                        : undefined
                    }
                  >
                    Terminar
                  </Button>
                  {(!hasValidContract || !canTerminate) && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                      onClick={() =>
                        openInfoModal(getActionDescription("terminate"))
                      }
                    />
                  )}
                </Stack>
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    disabled={
                      !hasFixedEndDate || !hasValidContract || !canRenew
                    }
                    variant="outlined"
                    cursorHover
                    spacing="compact"
                    onClick={
                      hasFixedEndDate && hasValidContract && canRenew
                        ? handleRenew
                        : undefined
                    }
                  >
                    Renovar
                  </Button>
                  {(!hasFixedEndDate || !hasValidContract || !canRenew) && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                      onClick={() =>
                        openInfoModal(getActionDescription("renew"))
                      }
                    />
                  )}
                </Stack>
                <StyledSeparatorLine />
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    cursorHover
                    spacing="compact"
                    disabled={!hasValidContract || !canModify}
                    onClick={
                      hasValidContract && canModify ? handleModify : undefined
                    }
                  >
                    Modificar
                  </Button>
                  {(!hasValidContract || !canModify) && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                      onClick={() =>
                        openInfoModal(getActionDescription("modify"))
                      }
                    />
                  )}
                </Stack>
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    disabled={!canCreateRequest}
                    iconBefore={<MdOutlineAdd />}
                    cursorHover
                    spacing="compact"
                    onClick={
                      canCreateRequest ? handleAddVinculation : undefined
                    }
                  >
                    Agregar vinculación
                  </Button>
                  {!canCreateRequest && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                      onClick={() =>
                        openInfoModal(
                          "No se puede agregar vinculación, ya que no tiene privilegios para ejecutar esta acción.",
                        )
                      }
                    />
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>

          {!hasValidContract && (
            <Stack>
              <Tag
                appearance={hasPendingRequest ? "primary" : "danger"}
                label={
                  hasPendingRequest
                    ? "El empleado NO tiene un contrato vigente, PERO tiene una solicitud de vinculación en trámite."
                    : "El empleado NO tiene ningún contrato vigente."
                }
              />
            </Stack>
          )}

          <Stack
            wrap="wrap"
            gap={isMobile ? spacing.s200 : spacing.s300}
            alignItems="flex-end"
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            {sortedContracts.map((contract, index) => (
              <ContractCard
                key={index}
                {...contract}
                onDetailsClick={() => handleDetailsClick(contract)}
              />
            ))}
            {canCreateRequest && !isTablet && (
              <StyledAddVinculation>
                <Icon
                  appearance="gray"
                  icon={<MdOutlineAdd />}
                  size="45px"
                  onClick={canCreateRequest ? handleAddVinculation : undefined}
                  cursorHover={canCreateRequest}
                />
                <Text appearance="gray">Agregar vinculación</Text>
              </StyledAddVinculation>
            )}
          </Stack>
        </StyledContractsContainer>
      </AppMenu>

      {isTablet && canCreateRequest && (
        <StyledAddVinculationMobile>
          <Icon
            appearance="primary"
            variant="filled"
            spacing="wide"
            shape="circle"
            icon={<MdOutlineAdd />}
            size="50px"
            cursorHover={canCreateRequest}
            onClick={canCreateRequest ? handleAddVinculation : undefined}
          />
        </StyledAddVinculationMobile>
      )}

      {modals.detail && selectedContract && (
        <RequestComponentDetail
          title="Detalles"
          buttonLabel="Cerrar"
          modalContent={[
            { label: "Sitio de trabajo", value: selectedContract.workplace },
            {
              label: "Fecha de formalización",
              value: selectedContract.formalizationDate,
            },
            { label: "Jornada laboral", value: selectedContract.contractType },
            {
              label: "Perfil salarial",
              value: currencyFormat(selectedContract.lastSalary),
            },
            ...(!selectedContract.isContractValid
              ? [
                  {
                    label: "Fecha de retiro",
                    value: selectedContract.retirementDate || "",
                  },
                  {
                    label: "Causal de retiro",
                    value: selectedContract.retirementReason || "",
                  },
                ]
              : []),
          ]}
          handleClose={() => closeModal("detail")}
          stackDirection="column"
        />
      )}

      {modals.terminate && (
        <SelectModal
          {...commonSelectModalProps}
          selectionOptions={terminationOptions}
          onCloseModal={() => closeModal("terminate")}
          onSubmit={handleSubmit("terminate")}
        />
      )}

      {modals.renew && (
        <SelectModal
          {...commonSelectModalProps}
          selectionOptions={renewOptions}
          onCloseModal={() => closeModal("renew")}
          onSubmit={handleSubmit("renew")}
        />
      )}

      {modals.modify && (
        <SelectModal
          {...commonSelectModalProps}
          selectionOptions={modifyOptions}
          onCloseModal={() => closeModal("modify")}
          onSubmit={handleSubmit("modify")}
        />
      )}

      {infoModal.open && (
        <InfoModal
          title={infoModal.title}
          titleDescription="¿Por qué está inhabilitado?"
          description={infoModal.description}
          onCloseModal={() =>
            setInfoModal({ open: false, title: "", description: "" })
          }
        />
      )}
    </>
  );
}

export { ContractsUI };
