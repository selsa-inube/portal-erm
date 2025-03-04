import * as Yup from "yup";

import { validationMessages } from "./validationMessages";

const validationRules = {
  names: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, validationMessages.onlyLetters)
    .required(validationMessages.required)
    .max(50, validationMessages.maxCharacters(50)),

  lastNames: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, validationMessages.onlyLetters)
    .required(validationMessages.required)
    .max(50, validationMessages.maxCharacters(50)),

  identificationNumber: Yup.string()
    .matches(/^[0-9]+$/, validationMessages.onlyNumbers)
    .required(validationMessages.required)
    .min(6, validationMessages.minNumbers(6))
    .max(15, validationMessages.maxNumbers(15)),
};

export { validationRules };
