import { useState } from "react";
import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";
import {
  Text,
  Icon,
  IIcon,
  SkeletonLine,
  useMediaQueries,
  Col,
  Colgroup,
  Pagination,
  Table,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
} from "@inubekit/inubekit";

import { TextAreaModal } from "@components/modals/TextAreaModal";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { ICertificationsTable } from "./types";
import { StyledTd, StyledTh } from "./styles";
import { columns, headers } from "./tableConfig";
import { usePagination } from "./usePagination";
import { Detail } from "./Detail";

interface CertificationsTableProps {
  data: ICertificationsTable[];
  loading?: boolean;
  disableDeleteAction?: boolean;
}

function CertificationsTable({
  data,
  loading = false,
  disableDeleteAction = false,
}: CertificationsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  useErrorFlag(
    showFlag,
    "El registro ha sido eliminado correctamente.",
    "Eliminación exitosa",
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    handleCloseModal();
    setShowFlag(true);
  };

  const {
    totalRecords,
    handleStartPage,
    handlePrevPage,
    handleNextPage,
    handleEndPage,
    firstEntryInPage,
    lastEntryInPage,
    currentData,
  } = usePagination(data);

  const mediaQueries = useMediaQueries([
    "(max-width: 1024px)",
    "(max-width: 542px)",
  ]);

  const determineVisibleHeaders = () => {
    if (mediaQueries["(max-width: 542px)"]) {
      return headers
        .filter((header) => ["date", "status", "days"].includes(header.key))
        .concat({
          label: "Acciones",
          key: "mobileActions",
          action: true,
          style: { width: "50px" },
        });
    } else if (mediaQueries["(max-width: 1024px)"]) {
      return headers.filter((header) =>
        ["date", "status", "days", "details", "delete"].includes(header.key),
      );
    }
    return headers;
  };

  const visibleHeaders = determineVisibleHeaders();
  const visibleColumns = mediaQueries["(max-width: 542px)"]
    ? columns.slice(1, 3)
    : mediaQueries["(max-width: 1024px)"]
      ? columns.slice(0, 3)
      : columns;

  const renderTableCell = (
    headerKey: string,
    cellData: {
      type?: string;
      value?: string | number | JSX.Element;
      onClick?: () => void;
    },
    rowIndex: number,
  ) => {
    const isMobileAction =
      headerKey === "mobileActions" && mediaQueries["(max-width: 542px)"];
    if (isMobileAction) {
      return (
        <Td
          key={headerKey}
          appearance={rowIndex % 2 === 1 ? "dark" : "light"}
          align="center"
          type="custom"
        >
          {loading ? (
            <SkeletonLine width="100%" animated={true} />
          ) : (
            <Detail
              onClickDetails={() => cellData}
              onClickEdit={cellData?.onClick}
              onClickEliminate={cellData?.onClick}
            />
          )}
        </Td>
      );
    }

    const cellType =
      headerKey === "details" || headerKey === "delete" || loading
        ? "custom"
        : "text";

    return (
      <StyledTd
        key={headerKey}
        appearance={rowIndex % 2 === 1 ? "dark" : "light"}
        type={cellType}
        align="center"
        style={{ padding: "16px 2px" }}
      >
        {renderCellContent(headerKey, cellData)}
      </StyledTd>
    );
  };

  const renderCellContent = (
    headerKey: string,
    cellData?: {
      value?: string | number | JSX.Element;
      type?: string;
      onClick?: () => void;
      hasDeletePrivilege?: boolean;
    },
  ) => {
    if (loading) {
      return <SkeletonLine width="100%" animated={true} />;
    }

    if (
      cellData &&
      cellData.type === "icon" &&
      (headerKey === "details" || headerKey === "delete")
    ) {
      if (headerKey === "details") {
        const iconProps: IIcon = {
          appearance: "dark",
          size: "16px",
          cursorHover: true,
          icon: <MdOutlineVisibility />,
        };

        return <Icon {...iconProps} />;
      }

      if (headerKey === "delete") {
        const hasPrivilege = !disableDeleteAction;
        const iconProps: IIcon = {
          appearance: hasPrivilege ? "danger" : "gray",
          size: "16px",
          onClick: hasPrivilege ? () => handleOpenModal() : undefined,
          cursorHover: hasPrivilege,
          icon: <MdDeleteOutline />,
        };
        return <Icon {...iconProps} />;
      }
    }
    return cellData?.value;
  };

  return (
    <>
      <Table>
        <Colgroup>
          {visibleColumns.map((col, index) => (
            <Col key={index} span={col.span} style={col.style} />
          ))}
        </Colgroup>
        <Thead>
          <Tr border="bottom">
            {visibleHeaders.map((header, index) => (
              <StyledTh
                key={index}
                action={header.action}
                align="center"
                style={header.style}
              >
                <b>{header.label}</b>
              </StyledTh>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            [...Array(3)].map((_, index) => (
              <Tr key={index} border="bottom">
                {visibleHeaders.map((_, cellIndex) => (
                  <Td
                    key={cellIndex}
                    align="center"
                    type="custom"
                    appearance={index % 2 === 1 ? "dark" : "light"}
                  >
                    <SkeletonLine width="100%" animated={true} />
                  </Td>
                ))}
              </Tr>
            ))
          ) : data.length === 0 ? (
            <Tr border="bottom">
              <Td colSpan={visibleHeaders.length} align="center" type="custom">
                <Text size="medium">No tiene solicitudes en trámite.</Text>
              </Td>
            </Tr>
          ) : (
            currentData.map((row: ICertificationsTable, rowIndex: number) => (
              <Tr key={rowIndex} border="bottom">
                {visibleHeaders.map((header) => {
                  const cellData = row[header.key];
                  return renderTableCell(
                    header.key,
                    cellData ?? { value: "" },
                    rowIndex,
                  );
                })}
              </Tr>
            ))
          )}
        </Tbody>

        {data.length > 0 && (
          <Tfoot>
            <Tr border="bottom">
              <Td colSpan={visibleHeaders.length} type="custom" align="center">
                <Pagination
                  firstEntryInPage={firstEntryInPage}
                  lastEntryInPage={lastEntryInPage}
                  totalRecords={totalRecords}
                  handleStartPage={handleStartPage}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  handleEndPage={handleEndPage}
                />
              </Td>
            </Tr>
          </Tfoot>
        )}
      </Table>

      {isModalOpen && (
        <TextAreaModal
          title="Eliminación"
          buttonText="Eliminar"
          inputLabel="Justificación"
          inputPlaceholder="¿Por qué eliminarás el registro?"
          onSubmit={handleDelete}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export { CertificationsTable };
