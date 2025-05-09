import { Stack, Breadcrumbs } from "@inubekit/inubekit";

import { PageTitle } from "../PageTitle";
import { StyledAppMenu } from "./styles";
import { IRoute } from "./types";

interface AppMenuProps {
  appName: string;
  appRoute: IRoute[];
  children: React.ReactNode;
  isMobile?: boolean;
  navigatePage: string;
  appDescription?: string;
  actionButton?: React.ReactNode;
}

function AppMenu(props: AppMenuProps) {
  const {
    appName,
    appRoute,
    children,
    navigatePage,
    appDescription,
    actionButton,
  } = props;

  return (
    <StyledAppMenu>
      <Breadcrumbs crumbs={appRoute} />
      <Stack direction="row" justifyContent="space-between">
        <PageTitle
          title={appName}
          description={appDescription}
          navigatePage={navigatePage}
        />
        {actionButton && (
          <Stack direction="row" justifyContent="flex-end">
            {actionButton}
          </Stack>
        )}
      </Stack>
      {children}
    </StyledAppMenu>
  );
}

export { AppMenu };
export type { AppMenuProps };
