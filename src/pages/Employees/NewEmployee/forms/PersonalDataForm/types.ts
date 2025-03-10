interface IPersonalDataEntry {
  id: string;
  names: string;
  lastNames: string;
  identificationNumber: number;
  attachedFile?: File;
}

export type { IPersonalDataEntry };
