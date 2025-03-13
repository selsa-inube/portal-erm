import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";

export interface IFormsUpdateData {
  personalInformation: { isValid: boolean; values: IPersonalDataEntry };
}

export interface ModalState {
  isSendModalVisible: boolean;
  isRequestInfoModalVisible: boolean;
}

export interface IAssignment {
  title: string;
  assignment: string;
  value: string;
}
