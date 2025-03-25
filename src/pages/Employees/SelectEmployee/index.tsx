import { Formik, FormikProps } from "formik";
import { Text, Button, Stack, useMediaQuery } from "@inubekit/inubekit";
import { MdOutlineAdd } from "react-icons/md";
import { spacing } from "@design/tokens/spacing";
import { StyledAppPage, StyledQuickAccessContainer } from "./styles";
import { useSelectEmployee } from "./interface";
import { EmployeeSearchField } from "./EmployeeSearchInput/index";

interface EmployeeFormValues {
  keyword?: string;
  employee: string;
}

function SelectEmployeePage() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    filteredEmployees,
    loading,
    error,
    setSearchTerm,
    isSubmitting,
    validationSchema,
    handleEmployeeSelection,
    selectedEmployee,
    handleSubmit,
  } = useSelectEmployee();

  return (
    <Formik<EmployeeFormValues>
      initialValues={{ keyword: "", employee: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Empleado seleccionado:", values.keyword);
      }}
    >
      {(formik: FormikProps<EmployeeFormValues>) => (
        <StyledAppPage>
          <Stack direction="column" gap={spacing.s250}>
            <StyledQuickAccessContainer>
              <Stack direction="column" gap={spacing.s250}>
                <Text type="headline" size={isMobile ? "small" : undefined}>
                  Seleccionar empleado
                </Text>
                <Text appearance="gray">
                  Digita la cédula y/o nombre del empleado que quieres
                  seleccionar.
                </Text>
                {loading && (
                  <Text appearance="gray">Cargando empleados...</Text>
                )}
                {error && <Text appearance="danger">{error}</Text>}

                <StyledQuickAccessContainer>
                  <form onSubmit={formik.handleSubmit}>
                    <EmployeeSearchField
                      formik={
                        formik as unknown as FormikProps<EmployeeFormValues>
                      }
                      isMobile={isMobile}
                      setSearchTerm={setSearchTerm}
                      filteredEmployees={filteredEmployees}
                      handleEmployeeSelection={(emp) =>
                        handleEmployeeSelection(emp, formik)
                      }
                      selectedEmployee={selectedEmployee}
                      handleSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      loading={loading}
                    />
                  </form>
                </StyledQuickAccessContainer>
              </Stack>
            </StyledQuickAccessContainer>

            <Stack justifyContent={"end"}>
              <Button
                appearance="primary"
                iconBefore={<MdOutlineAdd />}
                variant="none"
                spacing="wide"
                type="button"
                onClick={() => {
                  console.log("Redirigir a vincular nuevo empleado");
                }}
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
