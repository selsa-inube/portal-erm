import React from "react";
import { Text } from "@inubekit/inubekit";

import { StyledBorderedTag } from "./styles";

export interface BorderedTagProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  appearance: "success" | "danger" | "warning";
  children: React.ReactNode;
}

export const BorderedTag = ({
  appearance,
  children,
  ...props
}: BorderedTagProps) => {
  return (
    <StyledBorderedTag $color={appearance} {...props}>
      <Text type="label" weight="bold" size="medium" appearance={appearance}>
        {children}
      </Text>
    </StyledBorderedTag>
  );
};
