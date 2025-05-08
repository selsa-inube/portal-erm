import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import {
  EStatus,
  EType,
  HumanResourceRequest,
  IVacationGeneralInformationEntry,
} from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";

function isVacationData(
  data: unknown,
): data is IVacationGeneralInformationEntry {
  return (
    typeof data === "object" &&
    data !== null &&
    "startDate" in data &&
    "daysOff" in data
  );
}

export const formatHolidaysData = (holidays: HumanResourceRequest[]) =>
  holidays.map((holiday) => {
    const isVacation =
      holiday.humanResourceRequestType === EType.vacations &&
      isVacationData(holiday.humanResourceRequestData);

    const vacationData = isVacation
      ? (holiday.humanResourceRequestData as IVacationGeneralInformationEntry)
      : null;

    return {
      requestId: holiday.humanResourceRequestId,
      requestNumber: holiday.humanResourceRequestNumber,
      description: {
        value: holiday.humanResourceRequestDescription,
      },
      date: {
        value: formatDate(holiday.humanResourceRequestDate),
      },
      days: {
        value: isVacation ? Number(vacationData?.daysOff ?? 0) : 0,
      },
      status: {
        value:
          EStatus[
            holiday.humanResourceRequestStatus as unknown as keyof typeof EStatus
          ],
      },
      details: {
        value: <MdOutlineVisibility />,
        type: "icon" as const,
        onClick: () =>
          console.log(
            `Ver detalles de la solicitud ${holiday.humanResourceRequestId}`,
          ),
      },
      delete: {
        value: <MdDeleteOutline />,
        type: "icon" as const,
        onClick: () =>
          console.log(`Eliminar solicitud ${holiday.humanResourceRequestId}`),
      },
      dataDetails: {
        value: {
          ...holiday.humanResourceRequestData,
          startDate:
            isVacation && vacationData?.startDate
              ? formatDate(vacationData.startDate)
              : "",
          description: holiday.humanResourceRequestDescription,
        },
      },
    };
  });
