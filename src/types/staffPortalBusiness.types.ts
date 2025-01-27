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

export type { IStaffPortalByBusinessManager };
