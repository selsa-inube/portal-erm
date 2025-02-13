import {
  IHolidaysInProcess,
  IHolidayApiResponse,
} from "@ptypes/holidays.types";

const mapHolidaysInProcessApiToEntity = (
  item: IHolidayApiResponse,
): IHolidaysInProcess => {
  if (item.human_resource_request) {
    return {
      vacationId: String(
        item.human_resource_request.human_resource_request_id ?? "",
      ),
      contractId: String(
        item.human_resource_request.human_resource_request_data?.contractId ??
          "",
      ),
      vacationType: String(
        item.human_resource_request.human_resource_request_data?.vacationType ??
          "",
      ),
      startDateVacationEnjoyment: String(
        item.human_resource_request.human_resource_request_data
          ?.startDateVacationEnjoyment ?? "",
      ),
      nonWorkingDaysOfVacation: Number(
        item.human_resource_request.human_resource_request_data
          ?.nonWorkingDaysOfVacation ?? 0,
      ),
      joiningLetter: String(
        item.human_resource_request.human_resource_request_data
          ?.joiningLetter ?? "",
      ),
      earlyReturnDate: String(
        item.human_resource_request.human_resource_request_data
          ?.earlyReturnDate ?? "",
      ),
      vacationDaysPendingEarlyReturn: String(
        item.human_resource_request.human_resource_request_data
          ?.vacationDaysPendingEarlyReturn ?? "",
      ),
      vacationStatus: String(
        item.human_resource_request.human_resource_request_status ?? "",
      ),
      vacationPaymentDate: String(
        item.human_resource_request.human_resource_request_data
          ?.vacationPaymentDate ?? "",
      ),
    };
  }

  return {
    vacationId: String(item.vacationId ?? ""),
    contractId: String(item.contractId ?? ""),
    vacationType: String(item.vacationType ?? ""),
    startDateVacationEnjoyment: String(item.startDateVacationEnjoyment ?? ""),
    nonWorkingDaysOfVacation: Number(item.nonWorkingDaysOfVacation ?? 0),
    joiningLetter: String(item.joiningLetter ?? ""),
    earlyReturnDate: String(item.earlyReturnDate ?? ""),
    vacationDaysPendingEarlyReturn: String(
      item.vacationDaysPendingEarlyReturn ?? "",
    ),
    vacationStatus: String(item.vacationStatus ?? ""),
    vacationPaymentDate: String(item.vacationPaymentDate ?? ""),
  };
};

const mapHolidaysInProcessApiToEntities = (
  items: IHolidayApiResponse[],
): IHolidaysInProcess[] => {
  return items.map(mapHolidaysInProcessApiToEntity);
};

export { mapHolidaysInProcessApiToEntity, mapHolidaysInProcessApiToEntities };
