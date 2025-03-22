import { ContractCardProps } from "@components/cards/ContractCard";

export const contractCardMock: ContractCardProps[] = [
  {
    isContractValid: true,
    lastSalary: 3290000,
    startDate: "02/Sep/2024",
    endDate: "Indefinido",
    lastCharge: "Cargo anterior",
    contractType: "Tiempo completo",
    normativeFramework: "Marco XYZ",
    company: "Empresa ABC",
  },
  {
    isContractValid: false,
    lastSalary: 2500000,
    startDate: "15/Mar/2022",
    endDate: "20/Ago/2023",
    lastCharge: "Analista de datos",
    contractType: "Contrato por obra",
    normativeFramework: "Ley 123",
    company: "Empresa DEF",
  },
  {
    isContractValid: true,
    lastSalary: 4200000,
    startDate: "10/Jun/2023",
    endDate: "30/Nov/2026",
    lastCharge: "Desarrollador Senior",
    contractType: "Indefinido",
    normativeFramework: "Norma ABC",
    company: "Empresa GHI",
  },
];
