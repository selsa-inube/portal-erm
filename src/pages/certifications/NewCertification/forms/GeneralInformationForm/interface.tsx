import { FormikProps } from "formik";
import { useEffect } from "react";
import { ObjectSchema, AnyObject } from "yup";
import {
  Stack,
  Button,
  Select,
  Textarea,
  Input,
  useMediaQuery,
} from "@inubekit/inubekit";

import { isRequired } from "@utils/forms/forms";
import { getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import {
  certificationOptions,
  contractOptions,
} from "@pages/certifications/NewCertification/config/assisted.config";

import { StyledContainer } from "./styles";
import { IGeneralInformationEntry } from "./types";

interface GeneralInformationFormUIProps {
  formik: FormikProps<IGeneralInformationEntry>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  validationSchema?: ObjectSchema<AnyObject>;
}

const GeneralInformationFormUI = (props: GeneralInformationFormUIProps) => {
  const { formik, loading, withNextButton, validationSchema, handleNextStep } =
    props;

  const handleContractChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    formik.setFieldValue(
      "contractDesc",
      contractOptions.find((option) => option.value === value)?.label,
    );
  };

  useEffect(() => {
    if (contractOptions.length === 1 && !formik.values.contract) {
      const onlyOption = contractOptions[0];
      handleContractChange("contract", onlyOption.value);
    }
  }, [formik.values.contract]);

  const isMobile = useMediaQuery("(max-width: 700px)");
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap={spacing.s300}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction={isMobile ? "column" : "row"} gap={spacing.s300}>
            <Select
              name="certification"
              size="compact"
              label="Tipo de certificación"
              fullwidth={true}
              required
              options={certificationOptions}
              placeholder="Selecciona de la lista"
              value={formik.values.certification}
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
              }}
            />
            <Input
              size="compact"
              fullwidth={true}
              id="addressee"
              required
              label="Destinatario"
              name="addressee"
              placeholder="Ej: A quien interese"
              value={formik.values.addressee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Stack>
          {contractOptions.length > 1 && (
            <Stack>
              <Select
                size="compact"
                fullwidth={true}
                name="contract"
                required
                label="Contrato"
                options={contractOptions}
                value={formik.values.contract}
                placeholder="Selecciona de la lista"
                onChange={handleContractChange}
              />
            </Stack>
          )}
          <Stack>
            <Textarea
              label="Observaciones"
              placeholder="Detalles a tener en cuenta."
              name="observations"
              id="observations"
              value={formik.values.observations}
              maxLength={120}
              disabled={loading}
              status={getFieldState(formik, "observations")}
              message={formik.errors.observations}
              fullwidth
              required={
                validationSchema
                  ? isRequired(validationSchema, "observations")
                  : false
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Stack>
        </StyledContainer>
        {withNextButton && (
          <Stack justifyContent="flex-end">
            <Button
              fullwidth={isMobile}
              onClick={handleNextStep}
              disabled={loading ?? !formik.isValid}
            >
              Siguiente
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
};

export { GeneralInformationFormUI };
