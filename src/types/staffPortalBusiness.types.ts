import { IEmployeePortalByBusinessManager } from "./employeePortalBusiness.types";

interface IOptionsByStaffPortalBusinessManager {
  optionStaffId: string;
  staffPortalCatalogId: string;
  staffPortalId: string;
}

interface IStaffPortalByBusinessManager
  extends IEmployeePortalByBusinessManager {
  publicCode: string;
  url: string;
  optionsByStaffPortalBusinessManager: IOptionsByStaffPortalBusinessManager[];
}

export type { IStaffPortalByBusinessManager };
