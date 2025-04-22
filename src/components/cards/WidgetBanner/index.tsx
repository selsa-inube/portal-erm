import { Icon, Stack, Text } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";
import { IStyledWidgetBanner } from "./styles";

export interface WidgetBannerProps {
  icon: JSX.Element;
  value: number | string;
  label: string;
  onClick?: () => void;
}

export const WidgetBanner = (props: WidgetBannerProps) => {
  const { icon, value, label, onClick } = props;

  return (
    <IStyledWidgetBanner onClick={onClick} clickable={!!onClick}>
      <Stack alignItems="center" gap={spacing.s100}>
        <Icon icon={icon} appearance="primary" size="24px" />
        <Text type="title" weight="bold" size="large" appearance="primary">
          {value}
        </Text>
      </Stack>
      <Text type="label" appearance="gray">
        {label}
      </Text>
    </IStyledWidgetBanner>
  );
};
