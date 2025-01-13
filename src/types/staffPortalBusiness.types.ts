interface IOptionsByStaffPortalBusinessManager {
  optionStaffId: string;
  staffPortalCatalogId: string;
  staffPortalId: string;
}

interface IStaffPortalByBusinessManager {
  abbreviatedName: string;
  businessManagerId: string;
  businessUnit: string;
  descriptionUse: string;
  portalCode: string;
  staffPortalCatalogId: string;
  staffPortalId: string;
  optionsByStaffPortalBusinessManager?: IOptionsByStaffPortalBusinessManager[];
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
