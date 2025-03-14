import { useEffect } from "react";
import { Text, Button, Textfield, Stack } from "@inubekit/inubekit";
import { MdOutlineAdd } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { spacing } from "@design/tokens/spacing";
import {
  StyledAppPage,
  StyledQuickAccessContainer,
  StyledDropdownMenu,
  StyledDropdownItem,
} from "./styles";
import { useState } from "react";
import useAllEmployees from "@hooks/useEmployeeConsultation";
import useEmployeeById from "@hooks/useEmployeeConsultation";

function SelectEmployeePage() {
  const { employees, loading, error, refetch } = useAllEmployees();
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const validationSchema = Yup.object({
    keyword: Yup.string().required(
      "Para continuar, primero debes seleccionar un empleado.",
    ),
  });

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      setFilteredEmployees(employees);
      return;
    }
    const results = employees.filter(
      (emp) =>
        emp.names.toLowerCase().includes(keyword.toLowerCase()) ||
        emp.identificationDocumentNumber.includes(keyword),
    );
    setFilteredEmployees(results);
  };

  return (
    <Formik
      initialValues={{ keyword: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const { employees, loading, error } = useEmployeeById(
          Number(values.keyword),
        );
        if (loading) console.log("Cargando datos del empleado...");
        if (error) console.error("Error: ", error);
        if (employees) console.log("Empleado encontrado: ", employees);
      }}
    >
      {(formik: FormikProps<{ keyword: string }>) => (
        <StyledAppPage>
          <Stack direction="column" gap={spacing.s250}>
            <StyledQuickAccessContainer>
              <Stack direction="column" gap={spacing.s250}>
                <Text type="headline" size="large">
                  Seleccionar empleado
                </Text>

                <Text type="body" size="large" appearance="gray">
                  Digita la referencia o nombre del empleado que quieres
                  seleccionar.
                </Text>

                {loading && (
                  <Text appearance="gray">Cargando empleados...</Text>
                )}
                {error && <Text appearance="danger">{error}</Text>}

                <StyledQuickAccessContainer>
                  <form onSubmit={formik.handleSubmit}>
                    <Stack gap={spacing.s150} alignItems="center" width="534px">
                      <div style={{ position: "relative", width: "100%" }}>
                        <div style={{ position: "relative" }}>
                          <Textfield
                            placeholder="Palabra clave"
                            name="keyword"
                            id="names"
                            size="compact"
                            value={formik.values.keyword}
                            onChange={(e) => {
                              formik.handleChange(e);
                              handleSearch(e.target.value);
                            }}
                            fullwidth
                            onBlur={formik.handleBlur}
                            status={
                              formik.touched.keyword && formik.errors.keyword
                                ? "invalid"
                                : undefined
                            }
                            message={
                              formik.touched.keyword && formik.errors.keyword
                                ? formik.errors.keyword
                                : undefined
                            }
                          />
                          {formik.values.keyword && (
                            <IoMdCloseCircleOutline
                              style={{
                                position: "absolute",
                                top: "55%",
                                right: "10px",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                void formik.setFieldValue("keyword", "");
                              }}
                            />
                          )}
                        </div>
                        {filteredEmployees.length > 0 && (
                          <StyledDropdownMenu>
                            {filteredEmployees.map((emp) => (
                              <StyledDropdownItem
                                key={emp.identificationDocumentNumber}
                                onClick={() => {
                                  formik.setFieldValue(
                                    "keyword",
                                    `${emp.identificationDocumentNumber} - ${emp.names}`,
                                  );
                                  setFilteredEmployees([]);
                                  refetch();
                                }}
                              >
                                <Text
                                  size="large"
                                  type="body"
                                  appearance="gray"
                                >
                                  {emp.identificationDocumentNumber} -{" "}
                                  {emp.names}
                                </Text>
                              </StyledDropdownItem>
                            ))}
                          </StyledDropdownMenu>
                        )}
                      </div>
                      <Button
                        appearance="primary"
                        spacing="wide"
                        variant="filled"
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty}
                      >
                        Continuar
                      </Button>
                    </Stack>
                  </form>
                </StyledQuickAccessContainer>
              </Stack>
            </StyledQuickAccessContainer>
            <Stack justifyContent="end">
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
