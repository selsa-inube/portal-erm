import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";

const mapStaffPortalByBusinessManagerApiToEntity = (
  resend: Record<string, string | number | object>,
): IStaffPortalByBusinessManager => {
  const buildResend: IStaffPortalByBusinessManager = {
    abbreviatedName:
      typeof resend.abbreviatedName === "string" ? resend.abbreviatedName : "",
    businessManagerId:
      typeof resend.businessManagerId === "string"
        ? resend.businessManagerId
        : "",
    businessUnit:
      typeof resend.businessUnit === "string" ? resend.businessUnit : "",
    descriptionUse:
      typeof resend.descriptionUse === "string" ? resend.descriptionUse : "",
    portalCode: typeof resend.portalCode === "string" ? resend.portalCode : "",
    staffPortalCatalogId:
      typeof resend.staffPortalCatalogId === "string"
        ? resend.staffPortalCatalogId
        : "",
    staffPortalId:
      typeof resend.staffPortalId === "string" ? resend.staffPortalId : "",
  };
  return buildResend;
};

const mapStaffPortalByBusinessManagerApiToEntities = (
  resend: Record<string, string | number | object>[],
): IStaffPortalByBusinessManager[] => {
  return resend.map(mapStaffPortalByBusinessManagerApiToEntity);
};

export {
  mapStaffPortalByBusinessManagerApiToEntities,
  mapStaffPortalByBusinessManagerApiToEntity,
};
