import {
  Stack,
  Button,
  Select,
  Textarea,
  Textfield,
  useMediaQuery,
  Text,
} from "@inubekit/inubekit";
import { useEffect, useMemo, useState } from "react";
import Holidays from "date-holidays";
import { FormikProps } from "formik";
import * as Yup from "yup";

import { isRequired } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { getFieldState } from "@utils/forms/forms";
import { useAppContext } from "@context/AppContext";
import { IOption } from "@pages/requests/types";

import { IGeneralInformationEntry } from "./types";
import { StyledContainer, StyledDateContainer } from "./styles";
import { monthAbbr, monthFull } from "./config/formConfig";

interface GeneralInformationFormUIProps {
  formik: FormikProps<IGeneralInformationEntry>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const MONTH_OPTIONS: IOption[] = monthFull.map((label, index) => ({
  id: String(index),
  value: String(index),
  label,
}));

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const {
    formik,
    loading,
    withNextButton,
    handlePreviousStep,
    handleNextStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const { selectedEmployee } = useAppContext();

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [yearOptions, setYearOptions] = useState<IOption[]>([]);
  const [monthOptions, setMonthOptions] = useState<IOption[]>([]);
  const [dayOptions, setDayOptions] = useState<IOption[]>([]);

  const contractOptions = useMemo(
    () =>
      (selectedEmployee.employmentContracts ?? []).map((c) => ({
        id: c.contractId,
        value: `${c.businessName} - ${c.contractType}`,
        label: `${c.businessName} - ${c.contractType}`,
      })),
    [selectedEmployee.employmentContracts],
  );

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    setYearOptions(
      [currentYear, currentYear + 1].map((year) => ({
        id: String(year),
        value: String(year),
        label: String(year),
      })),
    );

    if (formik.values.startDate) {
      const [day, monthName, year] = formik.values.startDate.split("/");
      setSelectedDay(day);
      setSelectedMonth(String(monthAbbr.indexOf(monthName)));
      setSelectedYear(year);
    }
  }, []);

  useEffect(() => {
    if (!selectedYear) {
      setMonthOptions([]);
      return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const available =
      parseInt(selectedYear) > currentYear
        ? MONTH_OPTIONS
        : MONTH_OPTIONS.filter((_, idx) => idx >= currentMonth);

    setMonthOptions(available);
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const hd = new Holidays("CO");
      const year = parseInt(selectedYear);
      const month = parseInt(selectedMonth);
      const currentDate = new Date();

      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const date = new Date(year, month, day);
        const isPast =
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth() &&
          day < currentDate.getDate();

        return !isPast && date.getDay() % 6 !== 0 && !hd.isHoliday(date)
          ? {
              id: String(day),
              value: String(day).padStart(2, "0"),
              label: String(day).padStart(2, "0"),
            }
          : null;
      }).filter(Boolean) as IOption[];

      setDayOptions(days);
      if (!days.some((d) => d.value === selectedDay)) setSelectedDay("");
    } else {
      setDayOptions([]);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  useEffect(() => {
    const formattedDate =
      selectedYear && selectedMonth && selectedDay
        ? `${selectedDay}/${monthAbbr[parseInt(selectedMonth)]}/${selectedYear}`
        : "";
    formik.setFieldValue("startDate", formattedDate);
  }, [selectedYear, selectedMonth, selectedDay]);

  useEffect(() => {
    if (contractOptions.length === 1 && !formik.values.contract) {
      formik.setFieldValue("contract", contractOptions[0].value);
      formik.setFieldValue("contractDesc", contractOptions[0].label);
    }
  }, [contractOptions, formik.values.contract]);

  return (
    <form>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s250}>
            <Stack direction={isMobile ? "column" : "row"} gap={spacing.s250}>
              <Textfield
                label="Días de disfrute"
                placeholder="Ej: 2"
                name="daysOff"
                id="daysOff"
                type="number"
                value={formik.values.daysOff}
                status={getFieldState(formik, "daysOff")}
                message={formik.errors.daysOff}
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(props.validationSchema, "daysOff")}
              />
              <Stack direction="column" gap={spacing.s050} width="100%">
                <Text type="label" weight="bold" size="medium">
                  Fecha de inicio
                </Text>
                <StyledDateContainer>
                  <Select
                    name="startDateYear"
                    id="startDateYear"
                    placeholder={isMobile ? "Año" : "Selecciona año"}
                    options={yearOptions}
                    value={selectedYear}
                    disabled={loading}
                    size="compact"
                    onChange={(_, value) => setSelectedYear(value)}
                    required={isRequired(props.validationSchema, "startDate")}
                  />
                  <Select
                    name="startDateMonth"
                    id="startDateMonth"
                    placeholder={isMobile ? "Mes" : "Selecciona mes"}
                    options={monthOptions}
                    value={selectedMonth}
                    disabled={loading ?? !selectedYear}
                    size="compact"
                    onChange={(_, value) => setSelectedMonth(value)}
                    required={isRequired(props.validationSchema, "startDate")}
                  />
                  <Select
                    name="startDateDay"
                    id="startDateDay"
                    placeholder={isMobile ? "Día" : "Selecciona día"}
                    options={dayOptions}
                    value={selectedDay}
                    disabled={!!loading || !selectedMonth || !selectedYear}
                    message={formik.errors.startDate}
                    size="compact"
                    onChange={(_, value) => setSelectedDay(value)}
                    required={isRequired(props.validationSchema, "startDate")}
                  />
                </StyledDateContainer>
              </Stack>
            </Stack>
            {contractOptions.length > 1 && (
              <Select
                label="Contrato"
                name="contract"
                options={contractOptions}
                placeholder="Selecciona de la lista"
                value={formik.values.contract}
                message={formik.errors.contract}
                disabled={loading ?? contractOptions.length === 1}
                size="compact"
                fullwidth
                onChange={(_, value) => {
                  formik.setFieldValue("contract", value);
                  formik.setFieldValue(
                    "contractDesc",
                    contractOptions.find((o) => o.value === value)?.label ?? "",
                  );
                }}
                required={isRequired(props.validationSchema, "contract")}
              />
            )}
            <Textarea
              label="Observaciones"
              placeholder="Detalles a tener en cuenta."
              name="observations"
              id="observations"
              value={formik.values.observations}
              maxLength={1000}
              disabled={loading}
              status={getFieldState(formik, "observations")}
              message={formik.errors.observations}
              fullwidth
              required={isRequired(props.validationSchema, "observations")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Stack>
        </StyledContainer>
        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s250}>
            <Button
              appearance="gray"
              variant="outlined"
              onClick={handlePreviousStep}
            >
              Anterior
            </Button>
            <Button
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
}

export { GeneralInformationFormUI };
