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

interface IStaffUserAccount {
  accountName: string;
  biologicalSex: string;
  birthDay: Date;
  principalEmail: string;
  principalPhone: string;
  userAccount: string;
  userAccountId: string;
}

export type { IStaffPortalByBusinessManager, IStaffUserAccount };
