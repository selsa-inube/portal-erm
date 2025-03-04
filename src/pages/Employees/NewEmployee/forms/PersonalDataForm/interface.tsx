import { FormikProps } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  Stack,
  Button,
  Textfield,
  useMediaQuery,
  Grid,
  Divider,
} from "@inubekit/inubekit";
import { MdCheckCircleOutline } from "react-icons/md";

import { isRequired } from "@utils/forms";
import { spacing } from "@design/tokens/spacing";
import { getFieldState } from "@utils/forms";
import { mockAlertCards } from "@mocks/requirements/requirements.mock";

import { IPersonalDataEntry } from "./types";
import { StyledContainer } from "./styles";
import { RequirementsModal } from "./modals/RequirementsModal";
import { FileAttachment } from "./components/FileAttachment";

interface PersonalDataFormUIProps {
  formik: FormikProps<IPersonalDataEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
}

function PersonalDataFormUI(props: PersonalDataFormUIProps) {
  const { formik, loading, withNextButton, validationSchema, handleNextStep } =
    props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <form>
      <Stack direction="column" alignItems="flex-end" margin={spacing.s075}>
        <Button
          appearance="gray"
          variant="outlined"
          spacing="compact"
          iconBefore={<MdCheckCircleOutline />}
          onClick={handleOpenModal}
        >
          Requisitos
        </Button>
      </Stack>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s250}>
            <Grid
              templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
              gap="16px"
              width="100%"
              autoRows="unset"
            >
              <Textfield
                label="Nombres"
                placeholder="Ej: Juan Daniel"
                name="names"
                id="names"
                value={formik.values.names}
                status={getFieldState(formik, "names")}
                message={formik.errors.names}
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "names")}
              />
              <Textfield
                label="Apellidos"
                placeholder="Ej: Rodríguez Pérez"
                name="lastNames"
                id="lastNames"
                value={formik.values.lastNames}
                status={getFieldState(formik, "lastNames")}
                message={formik.errors.lastNames}
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "lastNames")}
              />
              <Textfield
                label="Número de identificación"
                placeholder="Número de identificación"
                name="identificationNumber"
                id="identificationNumber"
                type="number"
                value={formik.values.identificationNumber}
                status={getFieldState(formik, "identificationNumber")}
                message={formik.errors.identificationNumber}
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "identificationNumber")}
              />
            </Grid>
            <Divider dashed />
            <FileAttachment
              attachedFile={formik.values.attachedFile}
              onFileChange={(file) =>
                void formik.setFieldValue("attachedFile", file)
              }
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

      {isModalOpen && (
        <RequirementsModal
          alertCards={mockAlertCards}
          onCloseModal={handleCloseModal}
        />
      )}
    </form>
  );
}

export { PersonalDataFormUI };
