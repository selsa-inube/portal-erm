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
}

function AppMenu(props: AppMenuProps) {
  const { appName, appRoute, children, navigatePage, appDescription } = props;

  return (
    <StyledAppMenu>
      <Breadcrumbs crumbs={appRoute} />
      <Stack>
        <PageTitle
          title={appName}
          description={appDescription}
          navigatePage={navigatePage}
        />
      </Stack>
      {children}
    </StyledAppMenu>
  );
}

export { AppMenu };
export type { AppMenuProps };
