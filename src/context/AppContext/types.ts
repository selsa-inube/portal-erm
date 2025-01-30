import {
  IStaffPortalByBusinessManager,
  IStaffUserAccount,
} from "@ptypes/staffPortalBusiness.types";

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
    userAccountId: string;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      id: string;
      company: string;
      urlImgPerfil: string;
      userAccountId: string;
    } | null>
  >;
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
  setstaffUser: React.Dispatch<React.SetStateAction<IStaffUserAccount>>;
}
