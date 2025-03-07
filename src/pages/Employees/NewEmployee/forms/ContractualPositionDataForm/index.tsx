import { FormikProps, useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import * as Yup from "yup";

import { validationMessages } from "@validations/validationMessages";

import { ContractualPositionDataFormUI } from "./interface";
import { IContractualPositionData } from "./types";

const createValidationSchema = () =>
  Yup.object().shape({
    normativeFramework: Yup.string().required(validationMessages.required),
    contractType: Yup.string().required(validationMessages.required),
    startDate: Yup.string().required(validationMessages.required),
    endDate: Yup.string().required(validationMessages.required),
    company: Yup.string().required(validationMessages.required),
    workingShift: Yup.string().required(validationMessages.required),
    team: Yup.string().required(validationMessages.required),
    position: Yup.string().required(validationMessages.required),
    salaryProfile: Yup.string().required(validationMessages.required),
    jobMode: Yup.string().required(validationMessages.required),
  });

const validationSchema = createValidationSchema();

interface ContractualPositionDataFormProps {
  initialValues: IContractualPositionData;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IContractualPositionData) => void;
}

const ContractualPositionDataForm = forwardRef<
  FormikProps<IContractualPositionData>,
  ContractualPositionDataFormProps
>(
  (
    {
      initialValues,
      onFormValid,
      onSubmit,
      handleNextStep,
      handlePreviousStep,
      loading,
      withNextButton = false,
    },
    ref,
  ) => {
    const formik = useFormik({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit: onSubmit ?? (() => true),
    });

    useImperativeHandle(ref, () => formik);

    useEffect(() => {
      if (onFormValid) {
        formik.validateForm().then((errors) => {
          const isFormValid = Object.keys(errors).length === 0;
          onFormValid(isFormValid);
        });
      }
    }, [formik.values, onFormValid]);

    return (
      <ContractualPositionDataFormUI
        loading={loading}
        formik={formik}
        withNextButton={withNextButton}
        validationSchema={validationSchema}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
      />
    );
  },
);

ContractualPositionDataForm.displayName = "ContractualPositionDataForm";

export { ContractualPositionDataForm };
export type { ContractualPositionDataFormProps };
