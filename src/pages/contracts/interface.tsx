import {
  useMediaQuery,
  Stack,
  Text,
  Button,
  Icon,
  Tag,
} from "@inubekit/inubekit";
import { MdOutlineAdd, MdOutlineInfo } from "react-icons/md";

import { spacing } from "@design/tokens/spacing";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { ContractCard } from "@components/cards/ContractCard";
import { contractCardMock } from "@mocks/contracts/contracts.mock";

import {
  StyledContractsContainer,
  StyledSeparatorLine,
  StyledAddVinculation,
  StyledAddVinculationMobile,
} from "./styles";
import { Detail } from "./Detail";

interface ContractsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  hasPendingRequest?: boolean;
  canCreateRequest?: boolean;
}

function ContractsUI(props: ContractsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    hasPendingRequest = false,
    canCreateRequest = false,
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

  const handleTerminate = () => {
    console.log("Terminate contract");
  };

  const handleRenew = () => {
    console.log("Renew contract");
  };

  const handleModify = () => {
    console.log("Modify contract");
  };

  const handleAddVinculation = () => {
    console.log("Add Vinculation");
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
            {isTablet && (
              <Detail
                onClickEdit={hasValidContract ? handleModify : undefined}
                onClickEliminate={
                  hasValidContract ? handleTerminate : undefined
                }
                onClickAdd={canCreateRequest ? handleAddVinculation : undefined}
                onClickRenew={
                  hasFixedEndDate && hasValidContract ? handleRenew : undefined
                }
                disableModifyAction={!hasValidContract}
                disableRenewAction={!hasFixedEndDate || !hasValidContract}
                disableDeleteAction={!hasValidContract}
                disableAddAction={!canCreateRequest}
              />
            )}
            {!isTablet && (
              <Stack gap={spacing.s150}>
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    appearance="danger"
                    spacing="compact"
                    variant="outlined"
                    disabled={!hasValidContract}
                    cursorHover
                    onClick={hasValidContract ? handleTerminate : undefined}
                  >
                    Terminar
                  </Button>
                  {!hasValidContract && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                    />
                  )}
                </Stack>
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    disabled={!hasFixedEndDate || !hasValidContract}
                    variant="outlined"
                    cursorHover
                    spacing="compact"
                    onClick={
                      hasFixedEndDate && hasValidContract
                        ? handleRenew
                        : undefined
                    }
                  >
                    Renovar
                  </Button>
                  {(!hasFixedEndDate || !hasValidContract) && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
                    />
                  )}
                </Stack>
                <StyledSeparatorLine />
                <Stack gap={spacing.s025} alignItems="center">
                  <Button
                    cursorHover
                    spacing="compact"
                    disabled={!hasValidContract}
                    onClick={hasValidContract ? handleModify : undefined}
                  >
                    Modificar
                  </Button>
                  {!hasValidContract && (
                    <Icon
                      icon={<MdOutlineInfo />}
                      appearance="primary"
                      size="16px"
                      cursorHover
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
              <ContractCard key={index} {...contract} />
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
    </>
  );
}

export { ContractsUI };
