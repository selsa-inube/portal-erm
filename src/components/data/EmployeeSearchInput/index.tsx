import React from "react";
import { Input, Icon, Text } from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdOutlineCancel } from "react-icons/md";
import {
  StyledTextfieldContainer,
  StyledDropdownMenu,
  StyledDropdownItem,
} from "./styled";

interface SearchInputProps<T> {
  value: string;
  setValue: (value: string) => void;
  formik: FormikProps<{ keyword: string }>;
  filteredItems: T[];
  handleItemSelection: (
    emp: T,
    formik: FormikProps<{ keyword: string }>,
  ) => void;
  renderItemLabel: (item: T) => React.ReactNode;
  placeholder?: string;
}

export const SearchInput = <T extends object>({
  value,
  setValue,
  formik,
  filteredItems,
  handleItemSelection,
  renderItemLabel,
  placeholder = "Buscar...",
}: SearchInputProps<T>) => {
  const handleClearValue = () => {
    formik.setFieldValue("keyword", "");
    setValue("");
  };

  return (
    <StyledTextfieldContainer>
      <Input
        id="search-input"
        placeholder={placeholder}
        name="keyword"
        value={value}
        size="compact"
        onChange={(e) => {
          formik.handleChange(e);
          setValue(e.target.value);
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
          value && (
            <Icon
              size="18px"
              icon={<MdOutlineCancel />}
              appearance="gray"
              onClick={handleClearValue}
            />
          )
        }
      />
      {filteredItems.length > 0 && (
        <StyledDropdownMenu>
          {filteredItems.map((item, index) => (
            <StyledDropdownItem
              key={index}
              onClick={() => handleItemSelection(item, formik)}
            >
              <Text appearance="gray" as="span">
                {renderItemLabel(item)}
              </Text>
            </StyledDropdownItem>
          ))}
        </StyledDropdownMenu>
      )}
    </StyledTextfieldContainer>
  );
};
