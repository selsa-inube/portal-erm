import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Icon,
  Button,
  Stack,
  Autosuggest,
  Spinner,
  useMediaQuery,
} from "@inubekit/inubekit";
import { MdOutlineAdd, MdOutlineArrowForward } from "react-icons/md";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { spacing } from "@design/tokens/spacing";
import { StyledAppPage, StyledQuickAccessContainer } from "./styles";
import useAllEmployees from "@hooks/useEmployeeConsultation";

function SelectEmployeePage() {
  const { employees, loading, error } = useAllEmployees();
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMediaQuery("(max-width: 700px)");
  const navigate = useNavigate();

  const employeeOptions = employees.map((emp) => ({
    id: emp.employeeId,
    label: `${emp.identificationDocumentNumber} - ${emp.names}`,
    value: `${emp.identificationDocumentNumber} - ${emp.names}`,
  }));

  const validationSchema = Yup.object({
    employee: Yup.string()
      .required("Para continuar, primero debes seleccionar un empleado.")
      .oneOf(
        employeeOptions.map((opt) => opt.value),
        "Debes seleccionar una opción válida.",
      ),
  });

  return (
    <Formik
      initialValues={{ employee: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setIsSubmitting(true);
        setTimeout(() => {
          const selectedEmployee = employeeOptions.find(
            (opt) => opt.value === values.employee,
          );
          if (selectedEmployee) {
            console.log("Empleado seleccionado:", selectedEmployee);
            navigate("/");
          } else {
            console.error("Empleado no encontrado");
          }
          setIsSubmitting(false);
        }, 1500);
      }}
    >
      {(formik: FormikProps<{ employee: string }>) => (
        <StyledAppPage>
          <Stack direction="column" gap={spacing.s250}>
            {!isMobile ? (
              <StyledQuickAccessContainer>
                <Stack direction="column" gap={spacing.s250}>
                  <Text type="headline" size="large">
                    Seleccionar empleado
                  </Text>

                  <Text type="body" size="large" appearance="gray">
                    Digita el nombre del empleado que quieres seleccionar.
                  </Text>

                  <StyledQuickAccessContainer>
                    <form onSubmit={formik.handleSubmit}>
                      <Stack
                        gap={spacing.s150}
                        alignItems="center"
                        width={isMobile ? "100%" : "534px"}
                        direction="row"
                      >
                        {loading ? (
                          <Spinner size="medium" />
                        ) : error ? (
                          <Text type="body" size="small" appearance="danger">
                            {error}
                          </Text>
                        ) : (
                          <Autosuggest
                            name="employee"
                            id="employee"
                            placeholder="Escribe para buscar..."
                            value={formik.values.employee}
                            options={employeeOptions}
                            onChange={(_name, newValue) => {
                              formik.setFieldValue("employee", newValue);
                            }}
                            onBlur={() => {
                              const isValid = employeeOptions.some(
                                (opt) => opt.value === selectedOption,
                              );
                              if (!isValid) {
                                formik.setFieldError(
                                  "employee",
                                  "Debes seleccionar una opción válida.",
                                );
                                setSelectedOption("");
                                formik.setFieldValue("employee", "");
                              } else {
                                formik.setFieldValue(
                                  "employee",
                                  selectedOption,
                                );
                              }
                            }}
                            onFocus={() => {
                              setSelectedOption(selectedOption);
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
                          disabled={!formik.isValid || !formik.dirty || loading}
                        >
                          Continuar
                        </Button>
                      </Stack>

                      {formik.errors.employee && formik.touched.employee && (
                        <Text type="body" size="small" appearance="danger">
                          {formik.errors.employee}
                        </Text>
                      )}
                    </form>
                  </StyledQuickAccessContainer>
                </Stack>
              </StyledQuickAccessContainer>
            ) : (
              <>
                <Text type="headline" size="large">
                  Seleccionar empleado
                </Text>
                <Text type="body" size="large" appearance="gray">
                  Digita el nombre del empleado que quieres seleccionar.
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
                      <Text type="body" size="small" appearance="danger">
                        {error}
                      </Text>
                    ) : (
                      <Autosuggest
                        name="employee"
                        id="employee"
                        placeholder="Escribe para buscar..."
                        value={formik.values.employee}
                        options={employeeOptions}
                        onChange={(_name, newValue) => {
                          formik.setFieldValue("employee", newValue);
                        }}
                        onBlur={() => {
                          const isValid = employeeOptions.some(
                            (opt) => opt.value === selectedOption,
                          );
                          if (!isValid) {
                            formik.setFieldError(
                              "employee",
                              "Debes seleccionar una opción válida.",
                            );
                            setSelectedOption("");
                            formik.setFieldValue("employee", "");
                          } else {
                            formik.setFieldValue("employee", selectedOption);
                          }
                        }}
                        onFocus={() => {
                          setSelectedOption(selectedOption);
                        }}
                        size="wide"
                        fullwidth
                      />
                    )}

                    {isSubmitting ? (
                      <Spinner size="medium" />
                    ) : (
                      <Icon
                        appearance="primary"
                        disabled={!formik.isValid || !formik.dirty || loading}
                        icon={<MdOutlineArrowForward />}
                        cursorHover={true}
                        parentHover={false}
                        spacing="wide"
                        variant="filled"
                        shape="rectangle"
                        size="40px"
                        onClick={() => {
                          formik.handleSubmit();
                          navigate("/");
                        }}
                      />
                    )}
                  </Stack>

                  {formik.errors.employee && formik.touched.employee && (
                    <Text type="body" size="small" appearance="danger">
                      {formik.errors.employee}
                    </Text>
                  )}
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
