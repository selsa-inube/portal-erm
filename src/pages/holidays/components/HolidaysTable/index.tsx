import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import {
  Col,
  Colgroup,
  Pagination,
  Table,
  Tbody,
  Td,
  Tfoot,
  Thead,
  Tr,
  Icon,
  IIcon,
  useMediaQueries,
  Text,
  SkeletonLine,
} from "@inubekit/inubekit";

import { RequestComponentDetail } from "@components/modals/ComponentDetailModal";

import { IHolidaysTable, HolidayTableDataDetails } from "./types";
import { StyledTd, StyledTh } from "./styles";
import { columns, headers } from "./tableConfig";
import { usePagination } from "./usePagination";
import { Detail } from "./Detail";

interface HolidaysTableProps {
  data: IHolidaysTable[];
  loading?: boolean;
  disableDeleteAction?: boolean;
}

function HolidaysTable({
  data,
  loading = false,
  disableDeleteAction = false,
}: HolidaysTableProps) {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<
    { label: string; value: string }[] | null
  >(null);

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

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

  const renderCellContent = (
    headerKey: string,
    cellData?: {
      value?: string | number | JSX.Element | HolidayTableDataDetails;
      type?: string;
      onClick?: () => void;
      hasDeletePrivilege?: boolean;
    },
    rowIndex?: number,
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
          onClick: () => {
            const dataDe = data[rowIndex!].dataDetails
              ?.value as unknown as HolidayTableDataDetails;
            const dataDeta = [
              { label: "Días de disfrute", value: dataDe.daysEnjoyed },
              { label: "Fecha de inicio", value: dataDe.startDate },
              { label: "Contrato", value: dataDe.contract },
              { label: "Observaciones", value: dataDe.description },
            ];
            setSelectedRecord(dataDeta);
            setIsModalOpen(true);
          },
          icon: <MdOutlineVisibility />,
        };

        return <Icon {...iconProps} />;
      }

      if (headerKey === "delete") {
        const hasPrivilege = !disableDeleteAction;
        const iconProps: IIcon = {
          appearance: hasPrivilege ? "danger" : "gray",
          size: "16px",
          onClick: hasPrivilege
            ? () => {
                /* no-op */
              }
            : undefined,
          cursorHover: hasPrivilege,
          icon: <MdDeleteOutline />,
        };
        return <Icon {...iconProps} />;
      }
    }
    return typeof cellData?.value === "object"
      ? JSON.stringify(cellData.value)
      : cellData?.value;
  };

  const renderTableCell = (
    headerKey: string,
    cellData: {
      type?: string;
      value?: string | number | JSX.Element | HolidayTableDataDetails;
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
              onClickDetails={() => {
                /* no-op */
              }}
              onClickEdit={cellData?.onClick}
              onClickEliminate={
                !disableDeleteAction ? cellData?.onClick : undefined
              }
              disableDeleteAction={disableDeleteAction}
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
        {renderCellContent(headerKey, cellData, rowIndex)}
      </StyledTd>
    );
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
            Array.from({ length: 3 }).map((_, idx) => (
              <Tr key={idx} border="bottom">
                {visibleHeaders.map((_, index) => (
                  <Td key={index} colSpan={1} align="center" type="custom">
                    <SkeletonLine width="100%" animated />
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
            currentData.map((row: IHolidaysTable, rowIndex: number) => (
              <Tr key={rowIndex} border="bottom">
                {visibleHeaders.map((header) => {
                  const cellData = row[header.key] as {
                    type?: string;
                    value?:
                      | string
                      | number
                      | JSX.Element
                      | HolidayTableDataDetails;
                    onClick?: () => void;
                  };
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
      {isModalOpen && selectedRecord && (
        <RequestComponentDetail
          handleClose={handleClose}
          modalContent={selectedRecord}
          title="Detalles de la certificación"
          buttonLabel="Cerrar"
        />
      )}
    </>
  );
}

export { HolidaysTable };
