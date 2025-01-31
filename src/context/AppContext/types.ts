import {
  IStaffPortalByBusinessManager,
  IStaffUserAccount,
} from "@ptypes/staffPortalBusiness.types";

interface BusinessManager {
  id: string;
  publicCode: string;
  language: string;
  abbreviatedName: string;
  description: string;
  urlBrand: string;
  urlLogo: string;
  customerId: string;
}

export interface IPreferences {
  boardOrientation: "vertical" | "horizontal";
  showPinnedOnly: boolean;
}

export interface IClient {
  id: string;
  name: string;
  sigla: string;
  logo: string;
}

export interface IAppContextType {
  user: {
    username: string;
    id: string;
    company: string;
    urlImgPerfil: string;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<IAppContextType["user"]>>;
  preferences: IPreferences;
  updatePreferences: (newPreferences: Partial<IPreferences>) => void;
  logoUrl: string;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  handleClientChange: (client: IClient) => void;
  businessUnitSigla?: string;
  provisionedPortal: IStaffPortalByBusinessManager;
  setProvisionedPortal: React.Dispatch<
    React.SetStateAction<IStaffPortalByBusinessManager>
  >;
  staffUser: IStaffUserAccount;
  setStaffUser: React.Dispatch<React.SetStateAction<IStaffUserAccount>>;
  businessManagers: BusinessManager | null;
  setBusinessManagers: React.Dispatch<React.SetStateAction<BusinessManager>>;
}
