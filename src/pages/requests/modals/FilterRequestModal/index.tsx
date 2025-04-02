import { createPortal } from "react-dom";
import { MdClear, MdApps, MdOutlineFilterAlt } from "react-icons/md";
import {
  Icon,
  Stack,
  Text,
  useMediaQuery,
  Blanket,
  Divider,
  Button,
  Checkpicker,
  IOption,
} from "@inubekit/inubekit";
import { useFormik } from "formik";
import * as Yup from "yup";

import { spacing } from "@design/tokens/spacing";
import { validationMessages } from "@validations/validationMessages";

import { SelectedFilters } from "../SelectedFilters/index.tsx";
import { StyledModal, StyledContainerClose } from "./styles";
import { FormValues } from "./types";

export interface FilterRequestModalProps {
  portalId?: string;
  assignmentOptions?: IOption[];
  statusOptions?: IOption[];
  onCloseModal?: () => void;
  onSubmit?: (values: FormValues) => void;
}

export function FilterRequestModal(props: FilterRequestModalProps) {
  const {
    portalId = "portal",
    onCloseModal,
    onSubmit,
    assignmentOptions = [],
    statusOptions = [],
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  const validationSchema = Yup.object({
    assignment: Yup.string().required(validationMessages.required),
    value: Yup.number()
      .required(validationMessages.required)
      .min(1, "El valor debe ser mayor a 0"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      assignment: "",
      status: "",
      value: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      if (onSubmit) {
        onSubmit(values);
      }
    },
  });

  // Asegúrate de que las opciones estén ordenadas por tipo (o cualquier propiedad relevante)
  const sortedAssignmentOptions = [...assignmentOptions].sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  const sortedStatusOptions = [...statusOptions].sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  if (!portalNode) {
    throw new Error(
      "The portal node is not defined. Ensure the specific node exists in the DOM.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            Filtrar
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        <Divider />
        {isMobile && (
          <>
            <Stack alignItems="center" gap={spacing.s100}>
              <Icon
                icon={<MdOutlineFilterAlt />}
                size="20px"
                appearance="gray"
              />
              <SelectedFilters filters={[]} />
            </Stack>
            <Divider dashed />
          </>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" gap={spacing.s250}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Stack
                margin={`${spacing.s250} ${spacing.s0} ${spacing.s0} ${spacing.s0}`}
              >
                <Icon icon={<MdApps />} size="20px" appearance="gray" />
              </Stack>
              <Checkpicker
                label="Tipo"
                placeholder="Selecciona una opción"
                name="assignment"
                id="assignment"
                values={formik.values.assignment}
                message={
                  formik.touched.assignment
                    ? formik.errors.assignment
                    : undefined
                }
                size="compact"
                fullwidth
                onChange={(name, value) =>
                  void formik.setFieldValue(name, value)
                }
                options={sortedAssignmentOptions}
              />
            </Stack>
            <Stack alignItems="center" gap={spacing.s100}>
              <Stack
                margin={`${spacing.s250} ${spacing.s0} ${spacing.s0} ${spacing.s0}`}
              >
                <Icon icon={<MdApps />} size="20px" appearance="gray" />
              </Stack>
              <Checkpicker
                label="Estado"
                placeholder="Selecciona una opción"
                name="status"
                id="status"
                values={formik.values.status}
                message={
                  formik.touched.status ? formik.errors.status : undefined
                }
                size="compact"
                fullwidth
                onChange={(name, value) =>
                  void formik.setFieldValue(name, value)
                }
                options={sortedStatusOptions}
              />
            </Stack>
            <Stack justifyContent="flex-end" gap={spacing.s250}>
              <Button
                type="button"
                onClick={onCloseModal}
                appearance="gray"
                variant="outlined"
              >
                Cancelar
              </Button>
              <Button type="submit">Filtrar</Button>
            </Stack>
          </Stack>
        </form>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
