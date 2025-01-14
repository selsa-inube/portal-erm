interface IOptionsByStaffPortalBusinessManager {
  optionStaffId: string;
  staffPortalCatalogId: string;
  staffPortalId: string;
}

interface IStaffPortalByBusinessManager {
  abbreviatedName: string;
  businessManagerId: string;
  descriptionUse: string;
  optionsByStaffPortalBusinessManager: IOptionsByStaffPortalBusinessManager[];
  publicCode: string;
  staffPortalCatalogId: string;
  staffPortalId: string;
  url: string;
}

interface IBusinessManagers {
  id: string;
  publicCode: string;
  language: string;
  abbreviatedName: string;
  description: string;
  urlBrand: string;
  urlLogo: string;
  customerId: string;
}

interface IBusinessUnitsPortalStaff {
  publicCode: string;
  languageId: string;
  abbreviatedName: string;
  descriptionUse: string;
  firstMonthOfFiscalYear: string;
  urlLogo: string;
}

export type {
  IStaffPortalByBusinessManager,
  IBusinessManagers,
  IBusinessUnitsPortalStaff,
};
