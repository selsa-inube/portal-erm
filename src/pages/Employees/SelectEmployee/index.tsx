import {
  Stack,
  Text,
  Button,
  Spinner,
  Autosuggest,
  Icon,
} from "@inubekit/inubekit";
import {
  MdOutlineAdd,
  MdOutlineArrowForward,
  MdReportProblem,
} from "react-icons/md";
import { Formik, FormikProps } from "formik";
import { spacing } from "@design/tokens/spacing";
import { StyledAppPage, StyledQuickAccessContainer } from "./styles";
import { useSelectEmployee } from "./interface";

function SelectEmployeePage() {
  const {
    employeeOptions,
    isMobile,
    loading,
    error,
    isSubmitting,
    handleSubmit,
    validationSchema,
  } = useSelectEmployee();

  return (
    <Formik
      initialValues={{ employee: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik: FormikProps<{ employee: string }>) => (
        <StyledAppPage>
          <Stack direction="column" gap={spacing.s250}>
            {!isMobile ? (
              <StyledQuickAccessContainer>
                <Stack direction="column" gap={spacing.s250}>
                  <Text type="headline">Seleccionar empleado</Text>
                  <Text appearance="gray">
                    Digita la cédula y/o nombre del empleado que quieres
                    seleccionar
                  </Text>

                  <StyledQuickAccessContainer>
                    <form onSubmit={formik.handleSubmit}>
                      <Stack
                        gap={spacing.s150}
                        alignItems="center"
                        width="534px"
                        direction="row"
                      >
                        {loading ? (
                          <Spinner size="medium" />
                        ) : (
                          <Autosuggest
                            name="employee"
                            id="employee"
                            placeholder="Palabra clave"
                            value={formik.values.employee}
                            options={employeeOptions}
                            onChange={(_name, newValue) => {
                              if (newValue !== "no-results") {
                                formik.setFieldValue("employee", newValue);
                              } else {
                                formik.setFieldValue("employee", "");
                              }
                            }}
                            size="compact"
                            fullwidth
                          />
                        )}

                        <Button
                          appearance="primary"
                          loading={isSubmitting}
                          spacing="wide"
                          variant="filled"
                          type="submit"
                          disabled={!formik.values.employee || loading}
                        >
                          Continuar
                        </Button>
                      </Stack>

                      <Stack gap={spacing.s150}>
                        {formik.errors.employee && formik.touched.employee && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap={spacing.s100}
                            padding={`${spacing.s025} ${spacing.s200}`}
                          >
                            <Icon
                              icon={<MdReportProblem />}
                              appearance="danger"
                              size="16px"
                            />
                            <Text size="small" appearance="danger">
                              Para continuar, primero debes seleccionar un
                              empleado.
                            </Text>
                          </Stack>
                        )}
                      </Stack>
                    </form>
                  </StyledQuickAccessContainer>
                </Stack>
              </StyledQuickAccessContainer>
            ) : (
              <>
                <Text type="headline">Seleccionar empleado</Text>
                <Text appearance="gray">
                  Digita la cédula y/o nombre del empleado que quieres
                  seleccionar
                </Text>

                <form onSubmit={formik.handleSubmit}>
                  <Stack
                    gap={spacing.s150}
                    alignItems="center"
                    width="100%"
                    direction="row"
                  >
                    {loading ? (
                      <Spinner size="medium" />
                    ) : error ? (
                      <Text size="small" appearance="danger">
                        {error}
                      </Text>
                    ) : (
                      <Autosuggest
                        name="employee"
                        id="employee"
                        placeholder="Palabra clave"
                        value={formik.values.employee}
                        options={employeeOptions}
                        onChange={(_name, newValue) => {
                          formik.setFieldValue("employee", newValue);
                        }}
                        size="compact"
                        fullwidth
                      />
                    )}

                    {isSubmitting ? (
                      <Spinner size="medium" />
                    ) : (
                      <Icon
                        appearance="primary"
                        disabled={!formik.values.employee || loading}
                        icon={<MdOutlineArrowForward />}
                        cursorHover={true}
                        spacing="wide"
                        variant="filled"
                        shape="rectangle"
                        size="40px"
                        onClick={() => formik.handleSubmit()}
                      />
                    )}
                  </Stack>
                  <Stack gap={spacing.s150}>
                    {formik.errors.employee && formik.touched.employee && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={spacing.s100}
                        padding={`${spacing.s025} ${spacing.s200}`}
                      >
                        <Icon
                          icon={<MdReportProblem />}
                          appearance="danger"
                          size="16px"
                        />
                        <Text size="small" appearance="danger">
                          Para continuar, primero debes seleccionar un empleado.
                        </Text>
                      </Stack>
                    )}
                  </Stack>
                </form>
              </>
            )}

            <Stack width="100%" justifyContent="flex-end">
              <Button
                appearance="primary"
                iconBefore={<MdOutlineAdd />}
                variant="none"
                spacing="wide"
                type="button"
                onClick={() =>
                  console.log("Redirigir a agregar nuevo empleado")
                }
              >
                Vincular nuevo empleado
              </Button>
            </Stack>
          </Stack>
        </StyledAppPage>
      )}
    </Formik>
  );
}

export { SelectEmployeePage };
