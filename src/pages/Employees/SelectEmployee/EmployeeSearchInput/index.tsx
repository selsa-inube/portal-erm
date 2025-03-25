import { Input, Icon, Spinner, Text, Stack, Button } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOutlineCancel, MdOutlineArrowForward } from "react-icons/md";
import { spacing } from "@design/tokens/spacing";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import {
  StyledDropdownMenu,
  StyledDropdownItem,
  StyledTextfieldContainer,
} from "../styles";

export interface EmployeeFormValues {
  employee: string;
  keyword?: string;
  employeeId?: string;
}

interface EmployeeSearchFieldProps {
  formik: FormikProps<EmployeeFormValues>;
  isMobile: boolean;
  setSearchTerm: (value: string) => void;
  filteredEmployees: Employee[];
  handleEmployeeSelection: (
    emp: Employee,
    formik: FormikProps<EmployeeFormValues>,
  ) => void;
  selectedEmployee?: Employee;
  handleSubmit: (values: EmployeeFormValues) => void;
  isSubmitting: boolean;
  loading: boolean;
}

export const EmployeeSearchField = ({
  formik,
  isMobile,
  setSearchTerm,
  filteredEmployees,
  handleEmployeeSelection,
  selectedEmployee,
  handleSubmit,
  isSubmitting,
  loading,
}: EmployeeSearchFieldProps) => {
  return (
    <>
      <Stack
        gap={spacing.s150}
        alignItems="center"
        width={isMobile ? "100%" : "534px"}
        direction={"row"}
      >
        <StyledTextfieldContainer>
          <Input
            placeholder="Palabra clave"
            name="keyword"
            id="names"
            size="compact"
            value={formik.values.keyword}
            onChange={(e) => {
              formik.handleChange(e);
              setSearchTerm(e.target.value);
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
            iconAfter={
              formik.values.keyword ? (
                <Icon
                  size="18px"
                  icon={<MdOutlineCancel />}
                  appearance="gray"
                  onClick={() => {
                    formik.setFieldValue("keyword", "");
                    setSearchTerm("");
                  }}
                />
              ) : undefined
            }
          />
        </StyledTextfieldContainer>

        {isMobile ? (
          <Icon
            appearance="primary"
            disabled={!formik.isValid || !formik.dirty || loading}
            icon={
              isSubmitting ? (
                <Spinner appearance="primary" />
              ) : (
                <MdOutlineArrowForward />
              )
            }
            cursorHover={!loading}
            spacing="wide"
            variant="filled"
            shape="rectangle"
            size="40px"
            onClick={() => {
              if (selectedEmployee) {
                handleSubmit({
                  employee: selectedEmployee.employeeId,
                });
              }
            }}
          />
        ) : (
          <Button
            type="button"
            disabled={!formik.isValid || !formik.dirty}
            onClick={() => {
              if (selectedEmployee) {
                handleSubmit({
                  employee: selectedEmployee.employeeId,
                });
              }
            }}
          >
            Continuar
          </Button>
        )}
      </Stack>

      {filteredEmployees.length > 0 && (
        <StyledDropdownMenu>
          {filteredEmployees.map((emp) => (
            <StyledDropdownItem
              key={emp.identificationDocumentNumber}
              onClick={() => handleEmployeeSelection(emp, formik)}
            >
              <Text appearance="gray" size={isMobile ? "small" : "medium"}>
                {emp.identificationDocumentNumber} - {emp.names} {emp.surnames}
              </Text>
            </StyledDropdownItem>
          ))}
        </StyledDropdownMenu>
      )}
    </>
  );
};
